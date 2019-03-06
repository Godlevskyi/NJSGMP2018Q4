const parsedCookies = (req, res, next) => {
    if (!req.headers.cookie) return next();
    req.parsedCookies = req.headers.cookie
      .split('; ')
      .reduce((accum, current) => {
        const keyValue = current.split('=');
        const key = keyValue[0];
        const value = keyValue[1];
        return Object.assign(
          accum,
          { [key]: value },
        )
      }, {});
    next();
  };
  
  export default parsedCookies;
  

  