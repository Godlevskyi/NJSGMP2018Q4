const { Products } = require('../models/index');

module.exports = {
  getAllProducts: (req, res, next) => {

    Products.findAll({attributes: ['id', 'name', 'brand', 'price']})
      .then((result) => {
        console.log('result', result)
        res
          .status(200)
          .json(result);
      })
      .catch(next);
  },
  getSingleProduct: (req, res, next) => {
    console.log('req.params.id', req.params.id)
    Products.findAll({
      attributes: ['id', 'name', 'brand', 'price'], 
      where: {
        id: req.params.id
      }
    })
      .then((result) => {
        res
          .status(200)
          .json(result);
      })      
      .catch(next);
  },
  addNewProduct: (req, res, next) => {
    Products.create(req.body)
      .then((result) => {
        res
          .status(200)
          .json(result); 
      })
      .catch(next);
  },
  getAllProductReviews: (req, res, next) => {
    Products.findAll({
      attributes: ['reviews'], 
      where: {
        id: req.params.id
      }
    })
    .then((result) => {
      res
        .status(200)
        .json(result);
    })
    .catch(next); 
  },
};

