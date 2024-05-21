const db = require('../config/db');

const Booking = {
  create: (booking, callback) => {
    db.query(
      'INSERT INTO bookings (userId, trainId) VALUES (?, ?)',
      [booking.userId, booking.trainId],
      callback
    );
  },
  findById: (id, callback) => {
    db.query('SELECT * FROM bookings WHERE id = ?', [id], callback);
  }
};

module.exports = Booking;
