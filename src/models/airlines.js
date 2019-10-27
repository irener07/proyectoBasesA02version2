const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.set('useCreateIndex', true);


const airlinesSchema = new Schema({
    id: {
        type: Number,
        required: true, 
        unique: true
    },
    idAirport:{
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    countries: {
        type: Array,
        required: true
    }
});

module.exports = mongoose.model("airlines", airlinesSchema);