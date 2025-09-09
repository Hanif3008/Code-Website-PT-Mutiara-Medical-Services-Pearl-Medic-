const dokterMiddleware = (req, res, next) => {
    if (req.session.user) {
      req.user = req.session.user;
      next();
    } else {
      res.redirect('/login_dokter');
    }
  };
  
  module.exports = dokterMiddleware;
  