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
import * as githubObjects from './types';

export const mutation = new GraphQLObjectType({
  name: 'TopPackMutations',
  description: 'APIs which write data on the server',
  fields: () => ({
    import: {
      type: GraphQLString,
      description: 'Get all the Dependencies',
      args: {
        owner: {
          type: new GraphQLNonNull(GraphQLString),
          description: "Owner of the Repo"
        },
        repoName: {
          type: new GraphQLNonNull(GraphQLString),
          description: "Name of the Repo"
        }
      },
      resolve: (_, args) => {
        return ES.cachePackageDetails(args.owner, args.repoName);
      }
    }
  })
});
