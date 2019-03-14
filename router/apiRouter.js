import express from 'express';
const apiRouter = express.Router();

const productController = require('../controllers/product');
const userController = require('../controllers/user');

apiRouter.get('/products', productController.getAllProducts);

apiRouter.get('/products/:id', productController.getSingleProduct);

apiRouter.get('/products/:id/reviews', productController.getAllProductReviews);

apiRouter.post('/products', productController.addNewProduct);

apiRouter.get('/users', userController.getAllUsers);

export default apiRouter;