/* eslint-disable no-unused-vars */
import models from '../db/models';
import { checkAuth, checkIsAdmin } from '../helpers/utils';

const { Author } = models;

export const getAllAuthors = async () => {
  try {
    const authorList = await Author.findAll({});
    return authorList;
  } catch (error) {
    return error;
  }
};

export const findAuthorById = async (value) => {
  try {
    const { id } = value;
    const result = await Author.findOne({
      where: { id }
    });
    return result;
  } catch (error) {
    return error;
  }
};

export const findBookAuthor = async (book) => {
  try {
    const { authorId } = book;
    const result = await Author.findOne({
      where: { id: authorId }
    });
    return result;
  } catch (error) {
    return error;
  }
};

export const addAuthor = async (parent, args, context) => {
  try {
    checkAuth(context);
    const { name } = args;
    const authorName = name.toLowerCase();
    const [author, created] = await Author.findOrCreate({
      where: { name: authorName },
      defaults: {
        name: authorName
      },
    });
    if (!created) {
      throw new Error('author exist');
    }
    return author.dataValues;
  } catch (error) {
    return error;
  }
};

export const editAuthor = async (parent, args, context) => {
  try {
    await checkIsAdmin(context);
    const {
      id, name
    } = args;
    const author = await Author.findByPk(id);
    if (!author) {
      throw new Error('Author does not exist');
    }
    const [rowCount, updatedAuthor] = await Author.update({
      id,
      name,
    },
    { returning: true, where: { id } });
    return updatedAuthor[0].dataValues;
  } catch (error) {
    return error;
  }
};

export const deleteAuthor = async (parent, args, context) => {
  try {
    await checkIsAdmin(context);
    const {
      id
    } = args;
    const authorExist = await Author.findByPk(id);
    if (!authorExist) {
      throw new Error('No author with this id found');
    }
    const deletedCategory = await Author.destroy({
      returning: true, where: { id }
    });
    if (deletedCategory) {
      return authorExist.dataValues;
    }
  } catch (error) {
    return error;
  }
};
