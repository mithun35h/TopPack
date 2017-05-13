import _ from 'lodash';
import {config} from './config';
import {logger} from './logger';
import fs from 'fs';
import GitHubApi from 'github';

let github = new GitHubApi({
  // optional
  debug: false,
  protocol: "https",
  host: "api.github.com", // should be api.github.com for GitHub
  // pathPrefix: "/api/v3", // for some GHEs; none for GitHub
  headers: {
    "user-agent": "ReportGarden-IS-Cool" // GitHub is happy with a unique user agent
  },
  Promise: require('bluebird'),
  followRedirects: false, // default: true; there's currently an issue with non-get redirects, so allow ability to disable follow-redirects
  timeout: 5000
});

github.authenticate({type: "basic", username: config.git_username, password: config.git_password});

export let search = (q = 'javascript', sort = 'stars', order = 'desc', page = 1, per_page = 5) => new Promise(function(resolve, reject) {
  github.search.repos({
    q: q,
    sort: sort,
    order: order,
    page: page,
    per_page: per_page
  }, (err, res) => {
    if (err) {
      reject(err);
    }
    resolve(res.data.items);
  });
});

export let getDependencies = (owner = 'jashkenas', repo = 'underscore', path = 'package.json') => new Promise(function(resolve, reject) {
  github.repos.getContent({
    repo: repo,
    owner: owner,
    path: path
  }, (err, res) => {
    if (err) {
      reject(err);
    }
    var devDependencies = _.keys(JSON.parse(new Buffer(res.data.content, 'base64').toString()).devDependencies);
    var dependencies = _.keys(JSON.parse(new Buffer(res.data.content, 'base64').toString()).dependencies);
    var optionalDependencies = _.keys(JSON.parse(new Buffer(res.data.content, 'base64').toString()).optionalDependencies);
    var allDependencies = _.concat(devDependencies, optionalDependencies, dependencies);
    resolve({devDependencies: devDependencies, dependencies: dependencies, optionalDependencies: optionalDependencies, allDependencies: allDependencies});
  });
});
