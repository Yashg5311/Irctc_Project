const db = require('../config/db');
const bcrypt = require('bcryptjs');

const User = {
  create: (user, callback) => {
    const hashedPassword = bcrypt.hashSync(user.password, 10);
    db.query(
      'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
      [user.name, user.email, hashedPassword, user.role],
      callback
    );
  },
  findByEmail: (email, callback) => {
    db.query('SELECT * FROM users WHERE email = ?', [email], callback);
  }
};

module.exports = User;
