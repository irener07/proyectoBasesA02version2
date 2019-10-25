const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.set('useCreateIndex', true);

const employeesSchema = new Schema({
    id: {
        type: Number,
        required: true, 
        unique: true
    },
    firstName:{
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    hiringDate: {
        type: Date,
        required: true
    },
    jobArea: {
        type: Object,
        required: true
    },
    email: {
        type: String,
        required: true
    }, 
    password: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("employees", employeesSchema);