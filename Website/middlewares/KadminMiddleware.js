const KadminMiddleware = (req, res, next) => {
    if (req.session.user) {
      req.user = req.session.user;
      next();
    } else {
      res.redirect('/login_KepalaAdmin');
    } 
  };
  
  module.exports = KadminMiddleware;
  