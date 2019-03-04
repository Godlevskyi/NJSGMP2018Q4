const products = require('../data/products');

module.exports = {
  getAll: () => {
    return Promise.resolve(products);
  },
  getById: (id) => {
    const product = products.find(item => item.id === id);
  
    if (product) {
      return Promise.resolve(product);
    }
    
    return Promise.reject('ERROR: No product with such id')
  },
  getAllReviews: (id) => {
    if (!id) Promise.reject('ERROR: No product id');
  
    const product = products.find(item => item.id === id);
    
    const reviews = (product && product.reviews) || [];
    if (product) {
      return Promise.resolve(reviews);
    }
    
    return Promise.reject('ERROR: No product with such id')
  },
  addNew: (product) => {
    products.push(product);

    return Promise.resolve(product);
  },
};
