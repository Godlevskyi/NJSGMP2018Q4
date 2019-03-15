import jwt from 'jsonwebtoken';

const verifyRoute = (req, res, next) => {
  const token = req.headers['x-access-token'];

  if (token) {
    jwt.verify(token, 'secret', (err) => {
      if (err) {
        res
          .status(403)
          .json({
            success: false,
            message: 'Wrong authentication token'
          });
      } else {
        next();
      }
    });
  } else {
    res
      .status(403)
      .send({ 
        success: false,
        message: 'No auth token' 
      });
  }
}

export default verifyRoute;
