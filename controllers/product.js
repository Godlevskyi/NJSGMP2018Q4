const productModel = require('../models/product');

module.exports = {
  getAllProducts: (req, res, next) => {

    productModel.getAll()
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
    productModel.getById(req.params.id)
      .then((result) => {
        res
          .status(200)
          .json(result);
      })      
      .catch(next);
  },
  addNewProduct: (req, res, next) => {
    productModel.addNew(req.body)
      .then((result) => {
        res
          .status(200)
          .json(result); 
      })
      .catch(next);
  },
  getAllProductReviews: (req, res, next) => {
    productModel.getAllReviews(req.params.id)
    .then((result) => {
      res
        .status(200)
        .json(result);
    })
    .catch(next); 
  },
};

