const users = require('../data/users');

module.exports = {
  getAll: () => {
    return Promise.resolve(users);
  },
} 