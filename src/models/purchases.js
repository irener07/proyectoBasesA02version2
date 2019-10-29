const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.set('useCreateIndex', true);

const purchasesSchema = new Schema({
    id: {
        type: Number,
        required: true, 
        unique: true
    },
    idClient:{
        type: String,
        required: true
    },
    idFlight:{
        type: String,
        required: true
    },
    ticketsNumber: {
        type: Number,
        required: true
    },
    suitcases: {
        type: Number,
        required: true
    },
    observation:{
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    seatNumber: {
        type: Array,
        required: false,
    },
});

module.exports = mongoose.model("purchases", purchasesSchema);