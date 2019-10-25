const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.set('useCreateIndex', true);

const airportsSchema = new Schema({
    id: {
        type: Number,
        required: true, 
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    state: {
        type:String,
        required: true
    },
    address: {
        type:String,
        required: true
    },
    email: {
        type:String,
        required: true
    },
    telephone: {
        type: Number,
        required: true
    },
    webPage:{
        type:String,
        require: true
    }
});

module.exports = mongoose.model("airports", airportsSchema);