const Train = require('../models/train');
const Booking = require('../models/booking');

exports.addTrain = (req, res) => {
  const { source, destination, totalSeats } = req.body;
  Train.create({ source, destination, totalSeats }, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ trainId: results.insertId, message: 'Train added successfully' });
  });
};

exports.getAvailability = (req, res) => {
  const { source, destination } = req.query;
  Train.findAllBetweenStations(source, destination, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json(results);
  });
};

exports.bookSeat = (req, res) => {
  const { trainId } = req.body;
  const userId = req.userId; // assuming userId is added to req object by authentication middleware
  Train.findById(trainId, (err, results) => {
    if (err || results.length === 0) {
      return res.status(404).json({ error: 'Train not found' });
    }
    const train = results[0];
    if (train.availableSeats > 0) {
      const newSeats = train.availableSeats - 1;
      Train.updateSeats(trainId, newSeats, (err) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        Booking.create({ userId, trainId }, (err, results) => {
          if (err) {
            return res.status(500).json({ error: err.message });
          }
          res.status(200).json({ bookingId: results.insertId, message: 'Seat booked successfully' });
        });
      });
    } else {
      res.status(400).json({ error: 'No seats available' });
    }
  });
};

exports.getBookingDetails = (req, res) => {
  const { bookingId } = req.params;
  const userId = req.userId; // assuming userId is added to req object by authentication middleware
  db.query('SELECT * FROM bookings WHERE id = ? AND userId = ?', [bookingId, userId], (err, results) => {
    if (err || results.length === 0) {
      return res.status(404).json({ error: 'Booking not found' });
   
    }
} );
};