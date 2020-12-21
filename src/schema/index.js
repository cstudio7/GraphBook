import { GraphQLSchema } from 'graphql';
import RootQueryType from '../typeDef/query';
import RootMutationType from '../typeDef/mutations';
import RootUser from '../typeDef/User';


const schema = new GraphQLSchema({
  user: RootUser,
  query: RootQueryType,
  mutation: RootMutationType
});

export default schema;
