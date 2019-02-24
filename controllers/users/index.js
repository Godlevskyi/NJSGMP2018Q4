import { users } from '../../data/users';

export const getAllUsers = (req, res) => {
  res.json(users);
};