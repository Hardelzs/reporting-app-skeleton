const express = require('express');
const router = express.Router();
const db = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'change_this_secret_for_prod';

// Register
router.post('/register', (req, res) => {
  const { name, email, password, role } = req.body;
  if (!email || !password || !role) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  const hashed = bcrypt.hashSync(password, 8);

  try {
    // Insert user into DB
    const info = db.prepare(
      'INSERT INTO users (name,email,password,role) VALUES (?,?,?,?)'
    ).run(name || '', email, hashed, role);

    // Build user object
    const user = { id: info.lastInsertRowid, name, email, role };

    // Create JWT token
    const token = jwt.sign(user, JWT_SECRET);

    res.json({ user, token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Login
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  try {
    const row = db.prepare('SELECT * FROM users WHERE email = ?').get(email);

    if (!row) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const ok = bcrypt.compareSync(password, row.password);
    if (!ok) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const user = { id: row.id, name: row.name, email: row.email, role: row.role };
    const token = jwt.sign(user, JWT_SECRET);

    res.json({ user, token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
