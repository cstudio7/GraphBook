import { GraphQLString, GraphQLNonNull, GraphQLInt } from 'graphql';
import { BookType } from '../types';
import { addBook, editBook, deleteBook } from '../../resolvers/bookResolver';

export const addBookMutation = {
  type: BookType,
  description: 'Add a book',
  args: {
    name: { type: GraphQLNonNull(GraphQLString) },
    coverImage: { type: GraphQLString },
    authorId: { type: GraphQLNonNull(GraphQLInt) },
    categoryId: { type: GraphQLNonNull(GraphQLInt) }
  },
  resolve: (parent, args, context) => addBook(parent, args, context)
};

export const editBookMutation = {
  type: BookType,
  description: 'Edit a book',
  args: {
    id: { type: GraphQLNonNull(GraphQLInt) },
    name: { type: GraphQLNonNull(GraphQLString) },
    coverImage: { type: GraphQLString },
    authorId: { type: GraphQLNonNull(GraphQLInt) },
    categoryId: { type: GraphQLNonNull(GraphQLInt) }
  },
  resolve: (parent, args, context) => editBook(parent, args, context)
};

export const deleteBookMutation = {
  type: BookType,
  description: 'Delete a book',
  args: {
    id: { type: GraphQLNonNull(GraphQLInt) }
  },
  resolve: (parent, args, context) => deleteBook(parent, args, context)
};
