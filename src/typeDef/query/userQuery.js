import { UserType } from '../types';
import { currentUser } from '../../resolvers/authResolver';

export const userQuery = {
  type: UserType,
  description: 'Current User',
  resolve: (parent, args, context) => currentUser(parent, args, context)
};

export default {
  me: userQuery
};
