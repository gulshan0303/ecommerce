const express = require('express');
const { register,loginController, getAll, getUserById, updateUser, deleteUser, blockUser, unblockUser, handleToken, logOut, updatePassword, forgotPassword, resetPassword} = require('../controller/userConreoller');
const {authMiddleware, isAdmin} = require('../middleware/authMiddleware');


const router = express.Router();

router.post("/register",register)
 router.post("/login",loginController)
 router.post("/forgot-password",forgotPassword)
 router.put("/reset-password/:token",resetPassword)
 router.get("/all",getAll)
 router.get("/refresh",handleToken)
 router.get("/logout",logOut)
 router.get("/:id",authMiddleware,isAdmin, getUserById)
 router.put("/changepassword",authMiddleware,updatePassword)
 router.put("/:id",authMiddleware,updateUser)
 router.delete("/:id",deleteUser)
 router.put("/block/:id",authMiddleware,isAdmin,blockUser)
 router.put("/unblock/:id",authMiddleware,isAdmin,unblockUser)


module.exports = router