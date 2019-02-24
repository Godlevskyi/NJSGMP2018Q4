import express from 'express';
import {
  getSingleProduct,
  getAllProductReviews,
  addNewProduct,
  getAllUsers,
} from '../controllers';
import { getAllProducts } from '../controllers/products';
export const routers= () => {

  const router = express.Router();

  router.get('/api/products', (req, res) => {
    getAllProducts(req, res);
  });

  router.get('/api/products/:id', (req, res) => {
    getSingleProduct(req, res);
  });

  router.get('/api/products/:id/reviews', (req, res) => {
    getAllProductReviews(req, res);
  });

  router.post('/api/products', (req, res) => {
    addNewProduct(req, res);
  });

  router.get('/api/users', (req, res) => {
    getAllUsers(req, res);
  });

  return router;

};