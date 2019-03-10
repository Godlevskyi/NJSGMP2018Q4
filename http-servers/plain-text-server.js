
import http from 'http';

const port = 3000;

const requestHandler = (req, res) => {
  res.setHeader('Content-Type', 'plain text');
  res.end('Hello World');
};

const server = http.createServer(requestHandler);

server.listen(port, (err) => {
  if (err) {
    return console.log('Error: ', err);
  }
  console.log(`Server is listening on ${port}`);
});