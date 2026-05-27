const auth = require('./auth');

const adminAuth = (req, res, next) => {
  auth(req, res, () => {
    if (!req.user.isAdmin) {
      return res.status(403).json({ msg: 'Acceso denegado. Se requiere permisos de administrador.' });
    }
    next();
  });
};

module.exports = adminAuth;
