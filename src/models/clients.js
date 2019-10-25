const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.set('useCreateIndex', true);

const clientPhoneNumbersSchema = new Schema({
    telephones: {
        type: Array,
        required: true
    }
});

module.exports = mongoose.model("clientsPhoneNumbers",clientPhoneNumbersSchema);

const clientsSchema = new Schema({
    id: {
        type: Number,
        required: true, 
        unique: true
    },
    firstName: {
        type: String,
        required: true, 
    },
    lastName: {
        type: String,
        required: true, 
    },
    birthDate: {
        type: Date,
        required: true
    },
    nationality: {
        type: String,
        required: true, 
    },
    country: {
        type: String,
        required: true, 
    },
    state: {
        type: String,
        required: true, 
    },
    address: {
        type: String,
        required: true, 
    },
    email: {
        type: String,
        required: true, 
    },
    password: {
        type: String,
        required: true, 
    },
    clientTelephones: {
        type: Object,
        required: true,
    }
});

module.exports = mongoose.model("clients",clientsSchema);