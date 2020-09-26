const config = require('config');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    productname: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    amount: {
        type: BigInt,
        required: true,
        minlength: 0,
    },
    description: {
        type: String,
    },
    price: {
        type: String,
    },
    creationdate: {
        type: Date,
        required: true
    }
});

const Product = mongoose.model('Product', ProductSchema);

exports.Product = Product;