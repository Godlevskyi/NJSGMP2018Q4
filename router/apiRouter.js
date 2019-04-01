import express from 'express';
import {
  deleteProductById,
  getAllProducts,
  getSingleProduct,
  addNewProduct,
} from '../controllers/product';
import {
  getAllUsers,
  deleteUserById,
} from '../controllers/user';
import {
  deleteCityById,
  updateCityById,
  createNewCity,
  getAllCities,
} from '../controllers/city';
import { initMongoDb } from './mongodb/connector';

const apiRouter = express.Router();
initMongoDb(); 

apiRouter.get('/products', getAllProducts);
apiRouter.get('/products/:id', getSingleProduct);
apiRouter.delete('/products/:id', deleteProductById);
apiRouter.post('/products', addNewProduct);

apiRouter.get('/users', getAllUsers);
apiRouter.delete('/users/:id', deleteUserById);

apiRouter.get('/cities', getAllCities);
apiRouter.post('/cities', createNewCity);
apiRouter.put('/cities/:id', updateCityById);
apiRouter.delete('/cities/:id', deleteCityById);

export default apiRouter;