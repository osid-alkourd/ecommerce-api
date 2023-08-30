const User = require('../models/userModel');

const createNewUser = async (req, res) => {
    try {
        const email = req.body.email;
        const findUser = await User.findOne({ email: email });
        if (!findUser) {
            const newUser = await User.create(req.body);
            return res.status(201).json(newUser);
        }
        return res.status(409).json({ error: "The user already exist" });
    } catch (error) {
        console.error("Error creating a new user:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

module.exports = { createNewUser };