import { productModel } from '../models/Product';
import getLastModifiedDate from '../mongodb/getLastModifiedDate';

export const deleteProductById = (req, res, next) => {
  const id = Number(req.params.id);
  productModel.deleteOne({ id: id }, (err, data) => {
    if (err) next(err);
    res.send('Product deleted: ' + data);
  });
};

export const getAllProducts = (req, res, next) => {
  productModel.find({}, (err, data) => {
    if (err) next(err);
    res.send(data);
  })
};

export const getSingleProduct = (req, res, next) => {
  const id = Number(req.params.id);
  productModel.find({}, (err, data) => {
    if (err) next(err);
    res.send(data[id]);
  })
};

export const addNewProduct = (req, res, next) => {
  const {
    id,
    name,
    brand,
    price,
    color,
    size,
  } = req.body;
  const modifiedData = getLastModifiedDate();
  productModel.findOrCreate({ id, name, brand, price, color, size },
    { ...modifiedData },
    (err, data) => {
      if (err) next(err);
      res.send(data);
    }
  );
};

