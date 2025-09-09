const authMiddleware = (req, res, next) => {
  if (!req.session.user) {
      return res.redirect('/login_client');
  } 
  next();
};

module.exports = authMiddleware;
