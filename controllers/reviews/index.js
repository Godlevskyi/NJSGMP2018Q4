import { reviews } from '../../data/reviews';

export const getAllProductReviews = (req, res) => {
  const productId = Number(req.params.id);
  
  if (!productId) {
    res.send('ERROR: No product id');
  }

  const productReviews = reviews.filter((review) => review.id_product === productId);
  
  if (!productReviews.length) {
    res.send('No reviews for the specified product');
  }

  res.json(productReviews);
};
