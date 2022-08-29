"use strict";
const { validationResult } = require("express-validator");
const bycrypt = require("bcryptjs");
const data = require("../configs/adminData.json");

const HttpResponse = require("../models/http-response");
const Employee = require("../models/employeeSchema");
const User = require('../models/user')

//signup==========================================================================

const signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpResponse('Invalid inputs passed, please check your data.', 422)
    );
  }
  console.log(req.body)
  const { name, email, password } = req.body;

  // checking if user already exists
  let existingUser;

  try {
    existingUser = await User.findOne({ email: email })
  } catch (err) {
    const error = new HttpResponse(
      'Signing up failed, Something went wrong while checking existing user',
      500
    );
    return res.status(500).json({ response: error });
  }
  if (existingUser) {
    const error = new HttpResponse(
      'User exists already, please login instead.',
      422
    );
    return res.status(422).json({ response: error });
  }

  //creating a hashed password and saving the user into mongo.
  let hashedPassword;
  try {
    hashedPassword = await bycrypt.hash(password, 12);
  } catch (err) {
    const error = new HttpResponse("Hashing Failed ..", 500)
    return res.status(500).json({ response: error });
  }
  var createdUser;

  createdUser = new User({
    email,
    password: hashedPassword,
    name,
  });

  try {
    await createdUser.save();
  } catch (err) {
    console.log(err)
    const error = new HttpResponse(
      err,
      500
    );
    return res.status(500).json({ response: error })
  }

  res.status(201).json({
    id: createdUser.id,
    email: createdUser.email,
    name: createdUser.name
  });
};

//===========================================================================

// LOGIN FUNCTION
const login = async (req, res) => {
  const { email, password } = req.body;

  //trying to find if user email exists.
  let existingUser;

  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpResponse(
      "Something went wrong while checking user email",
      500
    );
    return res.status(500).json({ response: error });
  }
  if (!existingUser) {
    const error = new HttpResponse(
      "Invalid credentials, could not log you in.",
      401
    );
    return res.status(500).json({ response: error });
  }
  let isValidPassword;
  try {
    isValidPassword = await bycrypt.compare(password, existingUser.password);
  } catch (err) {
    const error = new HttpResponse(
      "Something went wrong while comparing passwords",
      500
    );
    return res.status(500).json({ response: error });
  }

  if (!isValidPassword) {
    const error = new HttpResponse("Wrong password entered", 401);
    return res.status(401).json({ response: error });
  }

  res.json({
    id: existingUser.id,
    email: existingUser.email,
  });

};
// ===========================================================

const createEmployees = async (req, res) => {
  const { name, email, role, line_manager, phone, address } = req.body;

  const createdUser = new Employee({
    email,
    name,
    role,
    line_manager,
    phone,
    address,
  });

  try {
    await createdUser.save();
  } catch (err) {
    console.log(err)
    const error = new HttpResponse(
      err,
      500
    );
    return res.status(500).json({ response: error })
  }

  res.status(200).json({
    id: createdUser.id,
    email: createdUser.email,
  });
};

const getEmployees = async (req, res) => {

  let employees;
  try {
    employees = await Employee.find()
  } catch (err) {
    const error = new HttpResponse(
      'Fetching employees failed, please try again later.',
      500
    );
    return res.json({ result: error });
  }
  return res.json({ employees });

};

const deleteEmployee = async (req, res) => {
  const { id } = req.params
  try {
    const employees = await Employee.findByIdAndDelete(id)
    return res.json({ employees });
  } catch (err) {
    const error = new HttpResponse(
      'delete failed',
      500
    );
    return res.json({ result: error });
  }
};

const getLineManagerOption = async (req, res) => {
  const { role } = req.params
  let employees;
  var query = {}

  if (role === 'admin') {
    query = { 'role': '' }
  }

  if (role === 'projectManager') {
    query = {
      "role": { '$in': ['admin'] }
    }
  }

  if (role === 'softwareEngineer' || role === 'qaEngineer' || role === 'designer') {
    query = { "role": { '$in': ['admin', 'projectManager'] } }
  }

  if (role === 'intern') {
    query = { "role": { '$in': ['admin', 'projectManager', 'softwareEngineer', 'designer', 'qaEngineer'] } }
  }

  try {
    employees = await Employee.find(query, { name: 1, role: 1, line_manager: 1 })
  } catch (err) {
    const error = new HttpResponse(
      'Fetching employees failed, please try again later.',
      500
    );
    return res.json({ result: error });
  }
  return res.json({ employees });

};

const setAdmins = async (req, res) => {
  console.log("seeding process")
  try {
    var adminData = await Employee.find({});
    if (adminData.length === 0) {
      await Employee.insertMany(data);
      console.log("admin list seeded");
    }
  } catch (err) {
    console.error(err);
  }
};

exports.setAdmins = setAdmins
exports.signup = signup;
exports.login = login;
exports.getEmployees = getEmployees;
exports.createEmployees = createEmployees
exports.getLineManagerOption = getLineManagerOption
exports.deleteEmployee = deleteEmployee