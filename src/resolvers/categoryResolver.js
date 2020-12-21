/* eslint-disable no-unused-vars */
import models from '../db/models';
import { checkAuth, checkIsAdmin } from '../helpers/utils';


const { Book, Category } = models;

export const getAllCategory = async () => {
  try {
    const categoryList = await Category.findAll({});
    return categoryList;
  } catch (error) {
    return error;
  }
};

export const findCategoryById = async (data) => {
  try {
    if (data) {
      const { id } = data;
      const result = await Category.findOne({
        where: { id }
      });
      return result;
    }
  } catch (error) {
    return error;
  }
};

export const addCategory = async (parent, args, context) => {
  try {
    checkAuth(context);
    const { name } = args;
    const categoryName = name.toLowerCase();
    const [category, created] = await Category.findOrCreate({
      where: { name: categoryName },
      defaults: {
        name: categoryName,
      },
    });
    if (!created) {
      throw new Error('Category exist');
    }
    return category.dataValues;
  } catch (error) {
    return error;
  }
};

export const findCategoryBooks = async (category) => {
  try {
    const { id } = category;
    const result = await Book.findAll({
      where: { categoryId: id }
    });
    return result;
  } catch (error) {
    return error;
  }
};

export const findBookCategory = async (data) => {
  try {
    if (data) {
      const { categoryId } = data;
      const result = await Category.findOne({
        where: { id: categoryId }
      });
      return result;
    }
  } catch (error) {
    return error;
  }
};

export const editCategory = async (parent, args, context) => {
  try {
    await checkIsAdmin(context);
    const {
      id, name
    } = args;
    const category = await Category.findByPk(id);
    if (!category) {
      throw new Error('Category does not exist');
    }
    const [rowCount, updatedCategory] = await Category.update({
      id,
      name,
    },
    { returning: true, where: { id } });
    return updatedCategory[0].dataValues;
  } catch (error) {
    return error;
  }
};

export const deleteCategory = async (parent, args, context) => {
  try {
    await checkIsAdmin(context);
    const {
      id
    } = args;
    const categoryExist = await Category.findByPk(id);
    if (!categoryExist) {
      throw new Error('No category with this id found');
    }
    const deletedCategory = await Category.destroy({
      returning: true, where: { id }
    });
    if (deletedCategory) {
      return categoryExist.dataValues;
    }
  } catch (error) {
    return error;
  }
};
