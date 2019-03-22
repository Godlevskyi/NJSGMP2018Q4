import passport from 'passport';
import TwitterStrategy from 'passport-twitter';
import { find } from 'lodash';
const { Users } = require('../models');

const APP_ID = 'w4qvekl1age6jpPvcA5TKpCOd';
const APP_SECRET = 'ohJb5xdfiITvSXmVf6U9BBDoy2RKMhFIV2khvAmN9NGX6YICIz';

export default function initTwitterStrategy() {
  passport.use(new TwitterStrategy(
    {
      consumerKey: APP_ID,
      consumerSecret: APP_SECRET,
      callbackURL: 'http://localhost:8080/auth/twitter/callback',
    },
    (accessToken, refreshToken, profile, done) => {
      Users.findAll({attributes: ['id', 'login', 'password', 'email']})
      .then((users) => {
        const registeredUser = find(users, { name: profile.displayName });
        if (!registeredUser) {
          return done(null, false, 'Incorrect credentials');
        }
        return done(null, registeredUser);

      })
      .catch((err) => done(null, false, err));
    },

  ));
}