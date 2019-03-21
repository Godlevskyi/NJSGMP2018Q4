const { Users } = require('../models/index');

module.exports = {
  getAllUsers: (req, res, next) => {
    Users.findAll({attributes: ['id', 'login', 'password', 'email']})
      .then((result) => {
        res
          .status(200)
          .send(result);
      })
      .catch(next);
  },
} 