import http from 'http';
import fs from 'fs';
import through from "through2";

const port = 3000;

const requestHandler = (req, res) => {
  const readableStream = fs.createReadStream("./index.html");
  res.setHeader('Content-Type', 'html');
  readableStream
    .pipe(through(
      (data, encoding, next) => {
        const message = data
          .toString()
          .replace('{message}', 'Hello World!');
        next(null, message);
      }, done => done(null)))
  .pipe(res);
};

const server = http.createServer(requestHandler);

server.listen(port, (err) => {
  if (err) {
    return console.log('Error: ', err);
  }
  console.log(`Server is listening on ${port}`);
});