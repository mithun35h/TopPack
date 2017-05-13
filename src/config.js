import fs from 'fs';
import nconf from 'nconf';
nconf.formats.yaml = require('nconf-yaml');
try {
  nconf.argv().file({file: nconf.get('conf'), format: nconf.formats.yaml}).argv();
} catch (e) {
  console.error('ERROR!', 'Please provide configuration path with --conf flag', e);
  process.exit();
}
exports.config = nconf.get();
