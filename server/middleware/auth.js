const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) {
    return res.status(401).json({ msg: 'No token, autorización denegada' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded || !decoded.user || !decoded.user.id) {
      return res.status(401).json({ msg: 'Token inválido' });
    }
    req.user = decoded.user;
    next();
  } catch (err) {
    console.error('Error verificando token:', err.message);
    res.status(401).json({ msg: 'Token inválido' });
  }
};