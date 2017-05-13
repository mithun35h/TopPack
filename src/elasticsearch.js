import {config} from './config';
import elasticsearch from 'elasticsearch';
import bodybuilder from 'bodybuilder';
import _ from 'lodash';
import * as git from './github';
import {logger} from './logger';

const client = new elasticsearch.Client({
  host: [
    {
      host: config.elasticsearch_ip,
      auth: config.es_username + ':' + config.es_password,
      protocol: 'http',
      port: config.elasticsearch_port
    }
  ],
  log: config.loglevel
});

export let insertDoc = (index = 'toppack', type = 'pack-details', id, doc) => new Promise(function(resolve, reject) {
  logger.info("Inserting Doc to Elasticsearch");
  client.index({index: index, type: type, id: id, body: doc}).then(function(resp) {
    resolve({"status": resp.created});
  }, function(err) {
    logger.error("Inserting Doc to Elasticsearch");
    reject(err.message);
  });
});

export let cachePackageDetails = (owner, name) => new Promise(function(resolve, reject) {
  logger.info("Get Package Details");
  git.getDependencies(owner, name).then((value) => {
    console.log(value);
    insertDoc('toppack', 'pack-details', `${owner}-${name}`, value).then((result) => {
      resolve(result);
    }).catch((err) => {
      logger.error("Get Package Details");
      reject(err);
    });
  }).catch((err) => {
    logger.error("Get Package Details");
    reject(err);
  });
});

export let topTerms = (topOf = 'allDependencies', size = 10) => new Promise(function(resolve, reject) {
  logger.info("Getting Top10");
  client.search({
    index: 'toppack',
    type: 'pack-details',
    body: new bodybuilder().aggregation('terms', topOf, {size: size}).build()
  }).then(function(resp) {
    resolve(resp.aggregations[`agg_terms_${topOf}`].buckets);
  }, function(err) {
    logger.error("Getting Top10");
    reject(err.message);
  });
});
