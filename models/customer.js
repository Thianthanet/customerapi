const mongoose = require('mongoose');

const CustomerSchema = mongoose.Schema({
    customerID: Number,
    name: String,
    address: String
}, {
    versionKey: false
});

module.exports = mongoose.model('Customer', CustomerSchema);