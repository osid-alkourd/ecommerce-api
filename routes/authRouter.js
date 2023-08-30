const express = require('express')
const router = express.Router();
const {createNewUser} = require('../controller/userController')
router.post('/register' , createNewUser);

module.exports = router;