const User = require('../models/userModel');
//const asyncHandler = require("express-async-handler");
const generateToken = require('./../config/jwtToken');
const bcrypt = require("bcrypt");
const mongoose = require('mongoose')

const createNewUser = async (req, res) => {
  const email = req.body.email;
  const findUser = await User.findOne({ email: email });
  if (!findUser) {
    const newUser = await User.create(req.body);
    return res.status(201).json(newUser);
  }
  return res.status(409).json({ error: "The user already exist" });
  // else {
  //   throw new Error('the user aleady exist');
  // }

};


const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).lean();
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    user.token = generateToken(user._id);
    return res.status(200).json({ user });
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }

}

const allUsers = async (req, res) => {
  const users = await User.find();
  return res.status(200).json(users);

}

const showUser = async (req, res) => {
  try {
    //const {id} = req.params;
    const user = await User.findById(req.params.id);
    if (user) {
      return res.status(200).json(user);
    }
    return res.status(404).json({ message: 'the user not found' });
  } catch (err) {
    return res.status(500).json({ message: 'server error' });
  }
}

const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (user) {
      //  return res.status(200).json(user);
      return res.status(200).json({ message: 'success deleted' });
    }
    return res.status(404).json({ message: 'the user not found' });
  } catch (err) {
    return res.status(500).json({ message: err.message });

  }
}

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    delete req.body.password // exclude the password filed from the request
    const data = req.body;
    const user = await User.findByIdAndUpdate(id, data, { new: true });
    if(user)
       return res.status(200).json(user);
    return res.status(404).json({message: 'the user not found'});
  } catch (err) {
    return res.status(500).json({ message: 'server error' });

  }


}

module.exports = { createNewUser, allUsers, loginUser, showUser, deleteUser, updateUser };