const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    date: String,
    approved: Boolean,
    user: { // reserva desse usuário
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    spot: { // para trabalhar nesse Spot
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Spot'
    },
    
});

module.exports = mongoose.model('Booking', BookingSchema);
