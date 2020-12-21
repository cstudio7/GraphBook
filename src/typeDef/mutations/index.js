import { GraphQLObjectType } from 'graphql';
import { addBookMutation, editBookMutation, deleteBookMutation } from './bookMutation';
import { addAuthorMutation, editAuthorMutation, deleteAuthorMutation } from './authorMutation';
import { signUpMutation, loginMutation } from './authUserMutation';
import { addCategoryMutation, editCategoryMutation, deleteCategoryMutation } from './categoryMutation';

const RootMutationType = new GraphQLObjectType({
  name: 'Mutation',
  description: 'Root Mutation',
  fields: () => ({
    addBook: addBookMutation,
    editBook: editBookMutation,
    deleteBook: deleteBookMutation,
    addAuthor: addAuthorMutation,
    editAuthor: editAuthorMutation,
    deleteAuthor: deleteAuthorMutation,
    addCategory: addCategoryMutation,
    editCategory: editCategoryMutation,
    deleteCategory: deleteCategoryMutation,
    login: loginMutation,
    signup: signUpMutation
  })
});

export default RootMutationType;
