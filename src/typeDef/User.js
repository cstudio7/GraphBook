import {
  GraphQLObjectType, GraphQLID, GraphQLString, GraphQLBoolean
} from 'graphql';


const RootUser = new GraphQLObjectType({
  name: 'User',
  description: 'Root User',
  fields: () => ({
    id: GraphQLID,
    username: GraphQLString,
    email: GraphQLString,
    isAdmin: GraphQLBoolean
  })
});

export default RootUser;
