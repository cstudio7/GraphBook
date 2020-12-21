import models from '../db/models';
import {
  tokenGenerator, comparePassword, checkAuth
} from '../helpers/utils';


const { User } = models;

export const currentUser = async (parent, args, context) => {
  checkAuth(context);
  try {
    const { user } = context;
    const userData = await User.findByPk(user.id);
    return userData;
  } catch (error) {
    throw new Error(error);
  }
};

export const signUpUser = async (args) => {
  let {
    email,
    username,
  } = args;
  email = email.toLowerCase();
  username = username.toLowerCase();

  const userData = {
    email,
    username,
    isAdmin: args.isAdmin,
    password: args.password
  };
  try {
    const user = await User.findOne({ where: { email } });

    if (user) {
      throw new Error('user with this email exist');
    }
    const newUser = await User.create(userData);
    const token = tokenGenerator(
      newUser.id, newUser.isAdmin, process.env.TOKEN_EXPIRY_DATE, process.env.SECRET, newUser.email
    );
    newUser.token = token;
    return newUser;
  } catch (error) {
    throw new Error(error);
  }
};

export const loginUser = async (args) => {
  let { email } = args;
  const { password } = args;
  email = email.toLowerCase();
  const user = await User.findOne({ where: { email } });
  try {
    if (!user) {
      throw new Error('No user with that email');
    }
    if (user && !comparePassword(user.password, password)) {
      throw new Error('User credentials are invalid');
    }
    const token = tokenGenerator(
      user.id, user.isAdmin, process.env.TOKEN_EXPIRY_DATE, process.env.SECRET, user.email
    );
    user.token = token;
    return user;
  } catch (error) {
    throw new Error(error);
  }
};
