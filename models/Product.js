const products = require('../data/products');

module.exports = {
  getAll: () => {
    return Promise.resolve(products);
  },
  getById: (id) => {
    const product = products.find(item => item.id === JSON.parse(id));
    if (!product) {
      return Promise.reject('ERROR: No product with such id')
    }

    return Promise.resolve(product);    
  },
  getAllReviews: (id) => {
    if (!id) Promise.reject('ERROR: No product id');
  
    const product = products.find(item => item.id === JSON.parse(id));
    
    const reviews = (product && product.reviews) || [];
    if (!product) {
      return Promise.reject('ERROR: No product with such id')
    }
    
    return Promise.resolve(reviews);
    
  },
  addNew: (product) => {
    products.push(product);

    return Promise.resolve(product);
  },
};
