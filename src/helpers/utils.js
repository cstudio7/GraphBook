import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import models from '../db/models';
/**
 * @param {string} password
 * @return {string} hash
 */
export const hashPassword = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

/**
 * @param {string} id
 * @param {string} isAdmin
 * @param {string} tokenExpiryDate
 * @param {string} secret
 * @param {string} email
 * @return {string} token
 */
export const tokenGenerator = (id, isAdmin, tokenExpiryDate = '1h', secret = 'secret', email) => {
  const payload = { id, isAdmin };
  if (email) {
    payload.email = email;
  }
  const token = jwt.sign(payload, secret, { expiresIn: tokenExpiryDate });
  return token;
};

/**
 * @param {string} hashPwd
 * @param {string} password
 * @return {string} hash
 */
export const comparePassword = (hashPwd, password) => bcrypt.compareSync(password, hashPwd);

export const checkAuth = (data) => {
  if (!data.user) {
    throw new Error('You are not authenticated');
  }
  return true;
};

export const checkIsAdmin = async (data) => {
  const { User } = models;
  try {
    checkAuth(data);
    const { user } = data;
    const userData = await User.findByPk(user.id);
    const { isAdmin } = userData;
    if (!isAdmin) {
      throw new Error('Unauthorized Access');
    }
    return true;
  } catch (error) {
    throw new Error(error);
  }
};


export const handleErrorNext = (err, req, res, next) => {
  if (err) {
    if (
      err.name === 'UnauthorizedError'
      || err.inner.name === 'TokenExpiredError'
    ) {
      res.status(401).send({
        status: 'error',
        message: 'Invalid token or expired token'
      });
    }
  }
  next(err);
};
