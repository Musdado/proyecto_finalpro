const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    stock: {
        type: Number,
        required: true,
    },
    brand: {
        type: String,
        required: true,
    },
    category: {
        type: [String],
        required: true,
    },
    registered_on: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Product', productSchema);