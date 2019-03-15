import express from 'express';
import { authenticate } from '../controllers/authController';
import passport from 'passport';

const authRouter = express.Router();

function defaultCallback(req, res) {
  if (!req.user) {
    res.json({
      error: 'User is not found'
    });
  } else {
    res.json(req.user);
  }
}

authRouter.post('/', authenticate);

authRouter.post('/local', passport.authenticate('local', { session: false }), defaultCallback);

authRouter.get('/facebook', passport.authenticate('facebook', { session: false }));
authRouter.get('/facebook/callback', passport.authenticate('facebook', { session: false }), defaultCallback);

authRouter.get('/twitter', passport.authenticate('twitter'));
authRouter.get('/twitter/callback', passport.authenticate('twitter'), defaultCallback);

authRouter.get('/google', passport.authenticate('google', { scope: 'https://www.googleapis.com/auth/plus.login' }));
authRouter.get('/google/callback', passport.authenticate('google'), defaultCallback);

export default authRouter;