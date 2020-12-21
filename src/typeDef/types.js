/* eslint-disable no-use-before-define */
import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLID,
  GraphQLBoolean,
} from 'graphql';
import FormatDate from 'dateformat';
import { findBookAuthor } from '../resolvers/authorResolver';
import { findAuthorsBooks } from '../resolvers/bookResolver';
import { findCategoryBooks, findBookCategory } from '../resolvers/categoryResolver';

export const BookType = new GraphQLObjectType({
  name: 'Book',
  description: 'This is the list of Books written by an author',
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    name: { type: GraphQLNonNull(GraphQLString) },
    authorId: { type: GraphQLNonNull(GraphQLInt) },
    categoryId: { type: GraphQLNonNull(GraphQLInt) },
    coverImage: { type: GraphQLString },
    dateCreated: {
      type: GraphQLNonNull(GraphQLString),
      resolve: book => FormatDate(book.createdAt)
    },
    dateUpdated: {
      type: GraphQLNonNull(GraphQLString),
      resolve: book => FormatDate(book.updatedAt)
    },
    author: {
      type: AuthorType,
      resolve: book => findBookAuthor(book)
    },
    category: {
      type: CategoryType,
      resolve: book => findBookCategory(book)
    }
  })
});

export const AuthorType = new GraphQLObjectType({
  name: 'Author',
  description: 'This is the list of authors',
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    name: { type: GraphQLNonNull(GraphQLString) },
    dateCreated: {
      type: GraphQLNonNull(GraphQLString),
      resolve: author => FormatDate(author.createdAt)
    },
    dateUpdated: {
      type: GraphQLNonNull(GraphQLString),
      resolve: author => FormatDate(author.updatedAt)
    },
    books: {
      type: new GraphQLList(BookType),
      resolve: author => findAuthorsBooks(author)
    }
  })
});

export const UserType = new GraphQLObjectType({
  name: 'User',
  description: 'Current user',
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLID) },
    email: { type: GraphQLNonNull(GraphQLString) },
    username: { type: GraphQLNonNull(GraphQLString) },
    isAdmin: { type: GraphQLNonNull(GraphQLBoolean) }
  })
});

export const AuthType = new GraphQLObjectType({
  name: 'Token',
  description: 'Token',
  fields: () => ({
    token: { type: GraphQLString }
  })
});

export const CategoryType = new GraphQLObjectType({
  name: 'Category',
  description: 'List of Book Category',
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    name: { type: GraphQLNonNull(GraphQLString) },
    dateCreated: {
      type: GraphQLNonNull(GraphQLString),
      resolve: category => FormatDate(category.createdAt)
    },
    dateUpdated: {
      type: GraphQLNonNull(GraphQLString),
      resolve: category => FormatDate(category.updatedAt)
    },
    books: {
      type: new GraphQLList(BookType),
      resolve: category => findCategoryBooks(category)
    }
  })
});
