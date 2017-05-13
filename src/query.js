import {
  getNamedType,
  getNullableType,
  GraphQLBoolean,
  GraphQLEnumType,
  GraphQLFloat,
  GraphQLID,
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLInterfaceType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLScalarType,
  GraphQLSchema,
  GraphQLString,
  GraphQLUnionType,
  isAbstractType,
  isCompositeType,
  isInputType,
  isLeafType,
  isOutputType
} from 'graphql';
import * as git from './github';
import * as ES from './elasticsearch';
import * as toppackObjects from './types';

export let query = new GraphQLObjectType({
  name: 'TopPackQueries',
  description: 'APIs to search Github',
  fields: () => ({
    search: {
      type: new GraphQLList(toppackObjects.SearchRepoResult),
      description: 'Get the Driver Mapped to OBD or viceversa',
      args: {
        q: {
          type: new GraphQLNonNull(GraphQLString),
          description: "Keyword to Search for"
        }
      },
      resolve: (_, args) => {
        return git.search(args.q);
      }
    },
    topN: {
      type: new GraphQLList(toppackObjects.topOccurences),
      description: 'Get the Top Dependency',
      args: {
        dependency: {
          type: new GraphQLNonNull(GraphQLString),
          description: "What kind of dependency"
        },
        size:{
          type: GraphQLInt,
          description: "How many?"
        }
      },
      resolve: (_, args) => {
        return ES.topTerms(args.dependency,args.size);
      }
    }
  })
});
