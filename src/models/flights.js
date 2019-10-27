const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.set('useCreateIndex', true);

const flightsSchema = new Schema({
    id: {
        type: Number,
        required: true, 
        unique: true
    },
    idAirline:{
        type: Number,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    origin: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        required: true
    },
    itinerary:{
        type: Object,
        required: true
    },
    dateTime: {
        type: Date,
        required: true
    },
    restrictions: {
        type: String,
        required: false,
    },
    services: {
        type: String,
        required: false
    },
    status:{
        type: String,
        required: true
    },
    maximumCapacity:{
        type: Number,
        required: true
    },
    ticketsSold: {
        type: Number,
        default: 0
    },
    seatNumber: {
        type: Number,
        default: 0
    },
    price: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model("flights", flightsSchema);