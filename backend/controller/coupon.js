const Coupon = require("../model/coupon");
const asyncHandler = require('express-async-handler');
const validateUserId = require("../utils/validateId");


//add coupon
const addCoupon = asyncHandler(async(req,res) => {
    try {
        const coupon = await Coupon.create(req.body);
        res.json(coupon);
    } catch (error) {
      throw new Error(error);  
    }
})

//get all coupon
const getAllCoupon = asyncHandler(async(req,res) => {
    try {
        const coupon = await Coupon.find();
        res.json(coupon);
    } catch (error) {
      throw new Error(error);  
    }
})
//update coupon
const updateCoupon = asyncHandler(async(req,res) => {
    const {id} = req.params;
    validateUserId(id);
    try {
        const updateCoupon = await Coupon.findByIdAndUpdate(id,req.body,{new:true});
        res.json(updateCoupon);
    } catch (error) {
      throw new Error(error);  
    }
})
//delete coupon
const deleteCoupon = asyncHandler(async(req,res) => {
    const {id} = req.params;
    validateUserId(id);
    try {
        const deleteCoupon = await Coupon.findByIdAndDelete(id);
        res.json({success:true,message:"Coupon has been deleted"});
    } catch (error) {
      throw new Error(error);  
    }
})

module.exports = {addCoupon,getAllCoupon,updateCoupon,deleteCoupon}