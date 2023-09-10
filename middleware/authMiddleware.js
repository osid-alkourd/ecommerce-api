const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const authMiddleware = async (req, res, next) => {
    try {
        let token;
        if (req?.headers?.authorization?.startsWith('Bearer')) {
            token = req.headers.authorization.split(" ")[1];
            if (token) {
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                const user = await User.findById(decoded?.id);
                req.user = user;
                next()
                return
            }
        }
        return res.status(401).json({ message: "unauthenticated" })
    } catch (err) {
        return res.status(500).json({ error: err.message })
    }
}

const isAdmin = async (req, res, next) => {
    // const user = req.user;
    try {
        const { email } = req.user;
        const userAdmin = await User.findOne({ email: email });
        if (userAdmin.role !== "admin")
            return res.status(401).json({ message: "unathorized" })
        next();
    } catch (err) {
        return res.status(500).json({ error: err.message })

    }

}
module.exports = { authMiddleware, isAdmin }