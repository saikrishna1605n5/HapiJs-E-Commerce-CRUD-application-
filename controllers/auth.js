const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const Boom = require('@hapi/boom');

const Config = require('../config');
const UsersModel = require('../models/users');

const registerUser = async function(req, res) {
  try {
    const userFound = await UsersModel.findOne({ email: req.payload.email.toLowerCase() });
    if (userFound) {
      return Boom.conflict('User with this email already exists');
    } else {
      req.payload.password = bcrypt.hashSync(req.payload.password, 8);
      let user = new UsersModel(req.payload);
      return await user.save();
    }
  } catch (e) {
    console.log(e.message);
    return Boom.badImplementation();
  }
};

const loginUser = async function(req) {
  let token = null;
  try {
    const user = await UsersModel.findOne({ email: req.payload.email.toLowerCase() });
    if (!user) {
      return Boom.notFound('User not found with the given email id');
    } else {
      const correctPwd = bcrypt.compareSync(req.payload.password, user.password);
      if (correctPwd) {
        let userData = _.pick(user, ['email', 'firstName', 'lastName']);
        token = jwt.sign(userData, Config.auth.jwtSecretKey, { expiresIn: Config.auth.expiresIn });
        return { success: true, message: 'Login Successful', data: token, statusCode: 200 };
      } else {
        return Boom.unauthorized('Invalid password');
      }
    }
  } catch (error) {
    console.log(e.message);
    return Boom.badImplementation();
  }
};

module.exports = { registerUser, loginUser };
