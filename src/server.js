/* eslint-disable no-console */
import express from 'express';
import expressGraphQL from 'express-graphql';
import bodyParser from 'body-parser';
import env from 'dotenv';
import cors from 'cors';
import schema from './schema';
import authMiddleWare from './middlewares/authMiddleware';
import { handleErrorNext } from './helpers/utils';


env.config();

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(
  '/graphql',
  authMiddleWare,
  expressGraphQL(req => (
    {
      schema,
      context: {
        user: req.user
      },
      graphiql: true
    }))
);

app.use((err, req, res, next) => {
  handleErrorNext(err, req, res, next);
});

app.all('*', (req, res) => res.status(404).send({
  status: 'error',
  message: 'you have entered an incorrect route'
}));

const PORT = process.env.PORT || 8001;

app.listen(PORT, () => console.log(`server listening on ${PORT}`));
