import passport from 'passport';
import LocalStrategy from 'passport-local';
import { find } from 'lodash';
const {Users} = require('../models');


export default function initLocalStrategy() {
  passport.use(new LocalStrategy((username, password, done) => {
    Users.findAll({attributes: ['id', 'login', 'password', 'email']})
      .then((users) => {
        const registeredUser = find(users, { name: username });
        if (!registeredUser || !password) {
          return done(null, false, { message: 'Incorrect credentials' });
        }
        return done(null, registeredUser);

      })
      .catch((err) => done(null, false, err));
  }));
}