const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const Boom = require('@hapi/boom');

const Config = require('../config');
const UsersModel = require('../models/users');

const createNewUser = async function(req, res) {
  try {
    const userFound = await UsersModel.findOne({ email: req.payload.email.toLowerCase() });
    if (userFound) {
      return Boom.conflict('User with this email already exists');
    } else {
      let user = new UsersModel(req.payload);
      return await user.save();
    }
  } catch (e) {
    console.log(e.message);
    return Boom.badImplementation();
  }
};

const getAllUsers = async function(req) {
  try {
    const users = await UsersModel.find({});
    return { success: true, message: 'Successful', data: users, statusCode: 200 };
  } catch (error) {
    console.log(e.message);
    return Boom.badImplementation();
  }
};

const getUserDetails = async function(req, res) {
  try {
    const userFound = await UsersModel.findOne({ _id: req.params.userId });
    if (!userFound) {
      return Boom.notFound("User with this user id doesn't exists");
    } else {
      return { success: true, message: 'Successful', data: userFound, statusCode: 200 };
    }
  } catch (e) {
    console.log(e.message);
    return Boom.badImplementation();
  }
};

const updateUserDetails = async function(req, res) {
  try {
    const userFound = await UsersModel.findOne({ _id: req.params.userId });
    if (!userFound) {
      return Boom.notFound("User with this user id doesn't exists");
    } else {
      return await UsersModel.replaceOne({ _id: req.params.userId }, req.payload);
    }
  } catch (e) {
    console.log(e.message);
    return Boom.badImplementation();
  }
};

const deleteUserDetails = async function(req, res) {
  try {
    const userFound = await UsersModel.findOne({ _id: req.params.userId });
    if (!userFound) {
      return Boom.notFound("User with this user id doesn't exists");
    } else {
      return await UsersModel.deleteOne({ _id: req.params.userId });
    }
  } catch (e) {
    console.log(e.message);
    return Boom.badImplementation();
  }
};

module.exports = { createNewUser, getAllUsers, getUserDetails, updateUserDetails, deleteUserDetails };
