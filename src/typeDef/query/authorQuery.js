import { GraphQLList, GraphQLInt } from 'graphql';
import {
  getAllAuthors,
  findAuthorById
} from '../../resolvers/authorResolver';
import { AuthorType } from '../types';

export const singleAuthorQuery = {
  type: AuthorType,
  description: 'Single authors',
  args: {
    id: { type: GraphQLInt }
  },
  resolve: (parent, args) => findAuthorById(args)
};

export const allAuthorsQuery = {
  type: new GraphQLList(AuthorType),
  description: 'List of all authors',
  resolve: () => getAllAuthors()
};
