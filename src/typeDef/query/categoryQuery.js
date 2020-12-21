import { GraphQLList, GraphQLInt } from 'graphql';
import { getAllCategory, findCategoryById } from '../../resolvers/categoryResolver';
import { CategoryType } from '../types';

export const singleCategoryQuery = {
  type: CategoryType,
  description: 'A single Category',
  args: {
    id: { type: GraphQLInt },
  },
  resolve: (parent, args) => findCategoryById(args)
};

export const allCategoryQuery = {
  type: new GraphQLList(CategoryType),
  description: 'List of all Categories',
  resolve: () => getAllCategory()
};
