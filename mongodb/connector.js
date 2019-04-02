import { cities } from '../data/cities';
import { users } from '../data/users';
import { products } from '../data/products';
import { cityModel } from '../models/City';
import { userModel } from '../models/User';
import { productModel } from '../models/Product';
import mongoose from 'mongoose';

export const initMongoDb = () => {
  mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true });
  cityModel.insertMany(cities, (err, res) => {
    if (err) throw err;
    console.log("Number of cities inserted: " + res.length);
  });

  productModel.insertMany(products, (err, res) => {
    if (err) throw err;
    console.log("Number of products inserted: " + res.length);
  });

  userModel.insertMany(users, (err, res) => {
    if (err) throw err;
    console.log("Number of users inserted: " + res.length);
  });
};