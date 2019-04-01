'use strict';
const users = require('../data/users');

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Users', users, {}),
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Users', null, {})
};
