import { GraphQLInt, GraphQLString, GraphQLNonNull } from 'graphql';
import { AuthorType } from '../types';
import { addAuthor, editAuthor, deleteAuthor } from '../../resolvers/authorResolver';

export const addAuthorMutation = {
  type: AuthorType,
  description: 'Add an author',
  args: {
    name: { type: GraphQLNonNull(GraphQLString) }
  },
  resolve: (parent, args, context) => addAuthor(parent, args, context)
};

export const editAuthorMutation = {
  type: AuthorType,
  description: 'Edit a author',
  args: {
    id: { type: GraphQLNonNull(GraphQLInt) },
    name: { type: GraphQLNonNull(GraphQLString) }
  },
  resolve: (parent, args, context) => editAuthor(parent, args, context)
};

export const deleteAuthorMutation = {
  type: AuthorType,
  description: 'Delete an author',
  args: {
    id: { type: GraphQLNonNull(GraphQLInt) }
  },
  resolve: (parent, args, context) => deleteAuthor(parent, args, context)
};
