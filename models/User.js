import mongoose from 'mongoose';
import findOrCreate from 'mongoose-find-or-create';

const Shema = mongoose.Schema;

const User = new Shema({
      id: {
         type: Number,
         unique: true,
      },
      name: String,
      email: String,
      password: Number,
});

User.plugin(findOrCreate);
export const userModel = mongoose.model('User', User);