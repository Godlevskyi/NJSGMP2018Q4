const parsedQuery = (req, res, next) => {
  if (!req.query) return next();
  req.parsedQuery = req.query;
  next();
};

export default parsedQuery;
