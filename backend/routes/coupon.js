const express = require('express');
const {getAllCoupon,deleteCoupon,updateCoupon,addCoupon} = require("../controller/coupon");
const { authMiddleware, isAdmin } = require('../middleware/authMiddleware');
const router = express.Router();

router.get("/all",authMiddleware,isAdmin,getAllCoupon);
router.post("/",authMiddleware,isAdmin,addCoupon);
router.put("/:id",authMiddleware,isAdmin,updateCoupon);
router.delete("/:id",authMiddleware,isAdmin,deleteCoupon);


module.exports = router