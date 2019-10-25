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
        type: Number,
        required: true
    },
    idFlight:{
        type: Number,
        required: true
    },
    ticketsNumber: {
        type: Number,
        required: true
    },
    suitcases: {
        type: Number,
        default: 0
    },
    observation:{
        type: String,
        required: true
    },
    status: {
        type: String,
        default: "Bought"
    },
    seatNumber: {
        type: Object,
        required: false,
    },
});

module.exports = mongoose.model("purchases", purchasesSchema);