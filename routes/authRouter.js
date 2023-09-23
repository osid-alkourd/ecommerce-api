const express = require('express')
const router = express.Router();
const {
     createNewUser, 
     allUsers, 
     loginUser,
     showUser, 
     deleteUser, 
     updateUser, 
     blockUser, 
     unBlockUser,
     logout} = require('../controller/userController')
const { authMiddleware, isAdmin } = require('../middleware/authMiddleware');
router.post('/register', createNewUser);
router.get('/all-users', authMiddleware, allUsers);
router.post('/login', loginUser);
router.delete('/logout',authMiddleware,logout);
router.get('/:id', authMiddleware, isAdmin, showUser);
router.delete('/:id', authMiddleware, deleteUser)
router.put('/:id', authMiddleware, updateUser)
router.put('/block-user/:id', authMiddleware, isAdmin, blockUser)
router.put('/un-block-user/:id', authMiddleware, isAdmin, unBlockUser)

module.exports = router;