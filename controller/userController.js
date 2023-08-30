const User = require('../models/userModel');
const asyncHandler = require("express-async-handler");

const createNewUser = asyncHandler(async (req, res, next) => {
        const email = req.body.email;
        const findUser = await User.findOne({ email: email });
        if (!findUser) {
            const newUser = await User.create(req.body);
            return res.status(201).json(newUser);
        }
        //return res.status(409).json({ error: "The user already exist" });
        else{
          throw new Error('the user aleady exist');
        }
    
})


const loginUser = asyncHandler(async (req,res,next) => {
   const {email , password} = req.body;
   
})

module.exports = { createNewUser };