const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
const User = require('../models/User');
const router = express.Router();

// Registro con email
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const existingUser = await User.findOne({ where: { [Op.or]: [{ email }, { username }] } });
    if (existingUser) return res.status(400).json({ msg: 'Usuario o email ya existe' });

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
    const user = await User.create({ username, email, passwordHash, isGuest: false });

    const payload = { user: { id: user.id } };
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' }, (err, token) => {
      if (err) throw err;
      res.json({ token, user: { id: user.id, username: user.username, email: user.email, totalPoints: user.totalPoints, isGuest: false } });
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error en servidor');
  }
});

// Login con email o username
router.post('/login', async (req, res) => {
  try {
    const { login, password } = req.body;
    const user = await User.findOne({ 
      where: { 
        [Op.or]: [{ email: login }, { username: login }],
        isGuest: false
      } 
    });
    if (!user) return res.status(400).json({ msg: 'Credenciales inválidas' });

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) return res.status(400).json({ msg: 'Credenciales inválidas' });

    const payload = { user: { id: user.id } };
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' }, (err, token) => {
      if (err) throw err;
      res.json({ token, user: { id: user.id, username: user.username, email: user.email, totalPoints: user.totalPoints, isGuest: false } });
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error en servidor');
  }
});

// Login como invitado (guest)
router.post('/guest', async (req, res) => {
  try {
    const guestCount = await User.count({ where: { isGuest: true } });
    const guestNumber = guestCount + 1;
    const username = `guest_${guestNumber}`;
    
    const user = await User.create({ 
      username, 
      email: null, 
      passwordHash: null, 
      isGuest: true,
      totalPoints: 0
    });

    const payload = { user: { id: user.id } };
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' }, (err, token) => {
      if (err) throw err;
      res.json({ token, user: { id: user.id, username: user.username, email: null, totalPoints: 0, isGuest: true } });
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error en servidor');
  }
});

// Obtener usuario actual (protegido)
router.get('/me', require('../middleware/auth'), async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, { attributes: { exclude: ['passwordHash'] } });
    res.json(user);
  } catch (err) {
    res.status(500).send('Error');
  }
});

module.exports = router;
