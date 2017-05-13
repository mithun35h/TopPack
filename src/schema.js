import {GraphQLSchema} from 'graphql';
import {query} from './query';
import {mutation} from './mutation';
const schema = new GraphQLSchema({query: query, mutation: mutation});
exports.schema = schema;
