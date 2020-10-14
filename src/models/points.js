const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const pointSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    username: {
        type: String,
        required: true
    },
    point: {
        type: Number,
        required: true,
    }
}, { timestamps: true });


module.exports = mongoose.model('Point', pointSchema);