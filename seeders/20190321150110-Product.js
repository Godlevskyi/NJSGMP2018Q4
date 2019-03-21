const products = require('../data/products');

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Products', products, {}),
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Products', null, {})
};
