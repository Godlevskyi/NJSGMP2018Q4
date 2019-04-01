import mongoose from 'mongoose';
import findOrCreate from 'mongoose-find-or-create';

const Shema = mongoose.Schema;

const Product = new Shema({
      id: {
         type: Number,
         unique: true,
      },
      name: String,
      brand: String,
      price: Number,
});

Product.plugin(findOrCreate);
export const productModel = mongoose.model('Product', Product);
