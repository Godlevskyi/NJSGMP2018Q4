const userModel = require('../models/user');

module.exports = {
  getAllUsers: (req, res, next) => {
    userModel.getAll()
      .then((result) => {
        res
          .status(200)
          .send(result);
      })
      .catch(next);
  },
} 