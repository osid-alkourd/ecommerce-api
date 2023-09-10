const express = require('express')
const router = express.Router();
const {createNewUser , allUsers , loginUser  , showUser , deleteUser ,updateUser} = require('../controller/userController')
const {authMiddleware , isAdmin} = require('../middleware/authMiddleware');
router.post('/register' ,  createNewUser);
router.get('/all-users' , authMiddleware   ,allUsers);
router.post('/login' , loginUser);
router.get('/:id' ,authMiddleware, isAdmin ,showUser);
router.delete('/:id',authMiddleware, deleteUser)
router.put('/:id',authMiddleware, updateUser)
module.exports = router;