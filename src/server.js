import _ from 'lodash';
import {config} from './config';
import {logger} from './logger';
import fs from 'fs';
import * as git from './github';
import express_server from 'express';
import graphQLHTTP from 'express-graphql';
const server = express_server();
import {schema} from './schema';
server.use('/', graphQLHTTP({schema, graphiql: true}));
server.listen(config.port, config.host, () => {
    console.log(`Listening on ${config.host}:${config.port}`);
});
