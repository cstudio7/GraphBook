/* eslint-disable no-unused-vars */
import models from '../db/models';
import { checkAuth, checkIsAdmin } from '../helpers/utils';

const { Book, Author, Category } = models;

export const getAllBooks = async () => {
  try {
    const bookList = await Book.findAll({});
    return bookList;
  } catch (error) {
    return error;
  }
};

export const findBookById = async (value) => {
  try {
    const { id } = value;
    const result = await Book.findOne({
      where: { id }
    });
    return result;
  } catch (error) {
    return error;
  }
};

export const findAuthorsBooks = async (author) => {
  try {
    const { id } = author;
    const result = await Book.findAll({
      where: { authorId: id }
    });
    return result;
  } catch (error) {
    return error;
  }
};

export const addBook = async (parent, args, context) => {
  try {
    await checkAuth(context);
    const {
      name, authorId, categoryId, coverImage
    } = args;
    const author = await Author.findByPk(authorId);
    const category = await Category.findByPk(categoryId);
    if (!author) {
      throw new Error('Author does not exist');
    }
    if (!category) {
      throw new Error('Category does not exist');
    }
    const bookName = name.toLowerCase();
    const [book, created] = await Book.findOrCreate({
      where: { name: bookName },
      defaults: {
        name: bookName,
        coverImage,
        authorId,
        categoryId
      },
    });
    if (!created) {
      throw new Error('Book exist');
    }
    return book.dataValues;
  } catch (error) {
    return error;
  }
};

export const editBook = async (parent, args, context) => {
  try {
    await checkIsAdmin(context);
    const {
      id, name, authorId, categoryId, coverImage
    } = args;
    const author = await Author.findByPk(authorId);
    const category = await Category.findByPk(categoryId);
    const bookExist = await Book.findByPk(id);
    if (!author) {
      throw new Error('Author does not exist');
    }
    if (!category) {
      throw new Error('Category does not exist');
    }
    if (!bookExist) {
      throw new Error('No book with this id found');
    }
    const [rowCount, updatedBooks] = await Book.update({
      id,
      name,
      authorId,
      categoryId,
      coverImage
    },
    { returning: true, where: { id } });
    return updatedBooks[0].dataValues;
  } catch (error) {
    return error;
  }
};

export const deleteBook = async (parent, args, context) => {
  try {
    await checkIsAdmin(context);
    const {
      id
    } = args;
    const bookExist = await Book.findByPk(id);
    if (!bookExist) {
      throw new Error('No book with this id found');
    }
    const deletedBooks = await Book.destroy({
      returning: true, where: { id }
    });
    if (deletedBooks) {
      return bookExist.dataValues;
    }
  } catch (error) {
    return error;
  }
};
