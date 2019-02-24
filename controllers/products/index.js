import { products } from '../../data/products';

export const getAllProducts = (req, res) => {
  res.json(products);
};

export const getSingleProduct = (req, res) => {
  const productId = Number(req.params.id);
  const product = products.filter((product) => product.id === productId);
  
  if (!productId) {
    res.send('ERROR: No product id');
  };  
  
  if (!product.length) {
    res.send('No such product found!');
  }
  
  res.json(product);
};

export const addNewProduct = (req, res) => {
  products.push(req.body);
  res.json(req.body);
};
