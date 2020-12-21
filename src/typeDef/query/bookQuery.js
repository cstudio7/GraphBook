import { GraphQLString, GraphQLList, GraphQLInt } from 'graphql';
import { getAllBooks, findBookById } from '../../resolvers/bookResolver';
import { BookType } from '../types';

export const singleBookQuery = {
  type: BookType,
  description: 'A single Book',
  args: {
    id: { type: GraphQLInt },
    name: { type: GraphQLString }
  },
  resolve: (parent, args) => findBookById(args)
};

export const allBooksQuery = {
  type: new GraphQLList(BookType),
  description: 'List of all Books',
  resolve: () => getAllBooks()
};
