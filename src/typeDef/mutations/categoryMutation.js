import { GraphQLInt, GraphQLString, GraphQLNonNull } from 'graphql';
import { CategoryType } from '../types';
import { addCategory, editCategory, deleteCategory } from '../../resolvers/categoryResolver';

export const addCategoryMutation = {
  type: CategoryType,
  description: 'Add an category',
  args: {
    name: { type: GraphQLNonNull(GraphQLString) }
  },
  resolve: (parent, args, context) => addCategory(parent, args, context)
};

export const editCategoryMutation = {
  type: CategoryType,
  description: 'Edit a category',
  args: {
    id: { type: GraphQLNonNull(GraphQLInt) },
    name: { type: GraphQLNonNull(GraphQLString) }
  },
  resolve: (parent, args, context) => editCategory(parent, args, context)
};

export const deleteCategoryMutation = {
  type: CategoryType,
  description: 'Delete a category',
  args: {
    id: { type: GraphQLNonNull(GraphQLInt) }
  },
  resolve: (parent, args, context) => deleteCategory(parent, args, context)
};
