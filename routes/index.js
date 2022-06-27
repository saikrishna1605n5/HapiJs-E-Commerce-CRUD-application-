const auth = require('./auth');
const users = require('./users');
const products = require('./productRoute');
const orders = require("./orderRoute");

module.exports = [].concat(auth, users,products ,orders);
