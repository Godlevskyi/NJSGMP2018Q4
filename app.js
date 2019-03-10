import express from 'express';
import parsedCookies from './middlewares/parsedCookies';
import parsedQuery from './middlewares/parsedQuery';
import bodyParser from 'body-parser';
const router = require('./router');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(parsedCookies);
app.use(parsedQuery);
app.use('/api',router);


export default app;
