'use strict';
const reviews = require('../data/reviews');

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Reviews', reviews, {}),
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Reviews', null, {})
};
