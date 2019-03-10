const express = require('express');
const router = express.Router();
const productController = require('../controllers/product');
const userController = require('../controllers/user');

router.get('/products', productController.getAllProducts);

router.get('/products/:id', productController.getSingleProduct);

router.get('/products/:id/reviews', productController.getAllProductReviews);

router.post('/products', productController.addNewProduct);

router.get('/users', userController.getAllUsers);

module.exports = router;