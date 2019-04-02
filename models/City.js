import mongoose from 'mongoose';
import findOrCreate from 'mongoose-find-or-create';

const Schema = mongoose.Schema;

const City = new Schema({
  name: String,
  country: String,
  capital: {
    type: Boolean,
    required: true
  },
  location: {
    lat: Number,
    long: Number
  }
});

City.plugin(findOrCreate);

export const cityModel = mongoose.model('City', City);