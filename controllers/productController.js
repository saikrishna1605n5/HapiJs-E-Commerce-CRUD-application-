
const Boom = require('@hapi/boom');

const Config = require('../config');
const ProductModel = require('../models/productModel');
const factory = require("./handlefactory");

exports.getAllProducts = factory.getAll(ProductModel);
exports.getProduct = factory.getOne(ProductModel);
exports.createNewProduct = factory.createOne(ProductModel);
exports.updateProduct= factory.updateOne(ProductModel);
exports.deleteProduct = factory.deleteOne(ProductModel);

