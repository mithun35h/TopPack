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

export let owner = new GraphQLObjectType({
  name: 'ownerDetails',
  description: 'Details of the Repo Owner',
  fields: {
    id: {
      type: GraphQLInt,
      description: "Unqiue Identifer Git Project"
    },
    login: {
      type: new GraphQLNonNull(GraphQLString),
      description: "UserName of owner"
    }
  }
});

export let topOccurences = new GraphQLObjectType({
  name: 'topOccurences',
  description: 'Key and the occurence count',
  fields: {
    key: {
      type: GraphQLString,
      description: "Unqiue Identifer of Dependency"
    },
    doc_count: {
      type: GraphQLInt,
      description: "Number of Occurences of Dependency"
    }
  }
});

export let SearchRepoResult = new GraphQLObjectType({
  name: 'SearchRepoResult',
  description: 'Details of the RepoList Seach',
  fields: {
    id: {
      type: GraphQLInt,
      description: "Unqiue Identifer Git Project"
    },
    name: {
      type: new GraphQLNonNull(GraphQLString),
      description: "Name of Project"
    },
    owner:{
      type: new GraphQLNonNull(owner),
      description: "Owner Details"
    },
    full_name: {
      type: GraphQLString,
      description: "Full Name of Project"
    },
    description: {
      type: new GraphQLNonNull(GraphQLString),
      description: "Description of the Project"
    },
    html_url: {
      type: GraphQLString,
      description: "User Friendly URL"
    },
    url: {
      type: GraphQLString,
      description: "API URL"
    },
    stargazers_count: {
      type: new GraphQLNonNull(GraphQLInt),
      description: "Number of Stars"
    },
    watchers_count: {
      type: new GraphQLNonNull(GraphQLInt),
      description: "Number of Watcher"
    },
    forks_count: {
      type: new GraphQLNonNull(GraphQLInt),
      description: "Number of Forks"
    }
  }
});
