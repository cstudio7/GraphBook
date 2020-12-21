import { GraphQLObjectType } from 'graphql';
import { singleBookQuery, allBooksQuery } from './bookQuery';
import { singleAuthorQuery, allAuthorsQuery } from './authorQuery';
import { singleCategoryQuery, allCategoryQuery } from './categoryQuery';
import { userQuery } from './userQuery';

const RootQueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'Root Query',
  fields: () => ({
    me: userQuery,
    book: singleBookQuery,
    books: allBooksQuery,
    author: singleAuthorQuery,
    authors: allAuthorsQuery,
    category: singleCategoryQuery,
    categories: allCategoryQuery
  })
});

export default RootQueryType;
