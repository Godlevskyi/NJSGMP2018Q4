import http from 'http';

const port = 3000;
const reqHandler = (req, res) => {
  req.pipe(res);
};

const server = http.createServer(reqHandler);

server.listen(port, (err) => {
  if (err) {
    return console.log('Error: ', err);
  }
  console.log(`Server is listening on ${port}`);
});