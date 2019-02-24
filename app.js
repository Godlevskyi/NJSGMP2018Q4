import express from 'express';
import parsedCookies from './middlewares/parsedCookies';
import parsedQuery from './middlewares/parsedQuery';
import { routers } from './routes';
import bodyParser from 'body-parser';

const app = express();

app.use(parsedCookies);
app.use(parsedQuery);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(routers());

export default app;
