const productModel = require('../models/product');

module.exports = {
  getAllProducts: (req, res, next) => {
    productModel.getAll()
      .then((result) => {
        res
          .status(200)
          .send(result);
      })
      .catch(next);
  },
  getSingleProduct: (req, res, next) => {
    productModel.getById(req.params.id)
      .then((result) => {
        res
          .status(200)
          .send(result);
      })
      .catch(next);
  },
  addNewProduct: (req, res, next) => {
    productModel.addNew(req.body)
      .then((result) => {
        res
          .status(200)
          .send(result);
      })
      .catch(next);
  },
  getAllProductReviews: (req, res, next) => {
    productModel.getAllReviews(req.params.id)
    .then((result) => {
      res
        .status(200)
        .send(result);
    })
    .catch(next); 
  },
};

