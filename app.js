import express from 'express';
import parsedCookies from './middlewares/parsedCookies';
import parsedQuery from './middlewares/parsedQuery';
import verifyRoute from './middlewares/verifyRoute';
import bodyParser from 'body-parser';
import passport from 'passport';
import session from 'express-session';
import {
  initFacebookStrategy,
  initLocalStrategy,
  initTwitterStrategy,
  initGoogleStrategy,
} from './strategies';
import apiRouter from './router/apiRouter';
import authRouter from './router/authRouter';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(parsedCookies);
app.use(parsedQuery);
app.use(session({ secret: 'SECRET', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use('/api/', verifyRoute);

initLocalStrategy();
initFacebookStrategy();
initTwitterStrategy();
initGoogleStrategy();


app.use('/auth', authRouter);
app.use('/api', apiRouter);


export default app;
