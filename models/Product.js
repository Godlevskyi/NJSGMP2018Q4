'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: DataTypes.STRING,
    brand: DataTypes.STRING,
    price: DataTypes.STRING,
  }, {});
  Product.associate = function(models) {
    Product.hasMany(models.Review, {
      foreignKey: 'productId',
      as: 'reviews',
    });
  };
  return Product;
};
