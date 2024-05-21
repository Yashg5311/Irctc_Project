const db = require('../config/db');

const Train = {
  create: (train, callback) => {
    db.query(
      'INSERT INTO trains (source, destination, totalSeats, availableSeats) VALUES (?, ?, ?, ?)',
      [train.source, train.destination, train.totalSeats, train.totalSeats],
      callback
    );
  },
  findAllBetweenStations: (source, destination, callback) => {
    db.query('SELECT * FROM trains WHERE source = ? AND destination = ?', [source, destination], callback);
  },
  findById: (id, callback) => {
    db.query('SELECT * FROM trains WHERE id = ?', [id], callback);
  },
  updateSeats: (id, seats, callback) => {
    db.query('UPDATE trains SET availableSeats = ? WHERE id = ?', [seats, id], callback);
  }
};

module.exports = Train;
