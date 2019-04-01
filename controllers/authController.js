import { find } from 'lodash';
import jwt from 'jsonwebtoken';

const { Users } = require('../models');

export const authenticate = (req, res, next) => {
  Users.findAll({attributes: ['id', 'login', 'password', 'email']})
    .then((users) => {
      const user = find(users, req.body);

      if (!user) {
        next({
          code: 404,
          message: 'Not Found',
          data: {},
        });
      }
      const token = jwt.sign(user, 'secret');
      const response = {
        code: 200,
        message: 'OK',
        data: {
          user,
        },
        token,
      };

      res.send(response);
    })
    .catch(next);
};

