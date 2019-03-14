import passport from 'passport';
import FacebookStrategy from 'passport-facebook';
import { find } from 'lodash';
const userModel = require('../models/user');

const APP_ID = 1880175192111422;
const APP_SECRET = 'b9ec9d60be814662a340b43aa2ac79d9';

export default function initFacebookStrategy() {
  passport.use(new FacebookStrategy(
    {
      clientID: APP_ID,
      clientSecret: APP_SECRET,
      callbackURL: 'http://localhost:3001/auth/facebook/callback',
    },
    (accessToken, refreshToken, profile, done) => {
      userModel.getAll()
        .then((users) => {
          const registeredUser = find(users, { name: profile.displayName });
          if (!registeredUser) {
            return done(null, false, 'User with given data is not registered');
          }
          return done(null, registeredUser);

        })
        .catch((err) => done(null, false, err));
    },
  ));
}