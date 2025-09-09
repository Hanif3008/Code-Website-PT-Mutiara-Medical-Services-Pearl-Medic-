const RoleMiddleware = (role) => {
    return (req, res, next) => {
        if (req.session.user && req.session.user.role === role) {
            return next();
        }
        return res.status(403).send('Forbidden');
    };
};

module.exports = RoleMiddleware;
