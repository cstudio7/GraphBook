import jwt from 'express-jwt';
import dotenv from 'dotenv';

dotenv.config();


const auth = jwt({
  secret: process.env.JWT_SECRET,
  credentialsRequired: false
});

export default auth;
