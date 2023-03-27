const Brand = require("../model/brand");
const asyncHandler = require('express-async-handler');
const validateUserId = require("../utils/validateId");
//create Brand
const createBrand = asyncHandler(async(req,res) => {
   try {
      const brand = await Brand.create(req.body);
      res.status(201).json({success:true,brand})
   } catch (error) {
      throw new Error(error)
   }
})

//get all Brand
const getAllBrand = asyncHandler(async(req,res) => {
   try {
      const brand = await Brand.find();
      res.status(200).json({success:true,brand})
   } catch (error) {
      throw new Error(error)
   }
})

//get Brand
//update Brand
const getBrand = asyncHandler(async(req,res) => {
   const {id} = req.params;
   validateUserId(id)
   try {
      const brand = await Brand.findById(id);
      res.status(200).json({success:true,brand})
   } catch (error) {
      throw new Error(error)
   }
})
//update Brand
const updateBrand = asyncHandler(async(req,res) => {
   const {id} = req.params;
   validateUserId(id)
   try {
      const updateBrand = await Brand.findByIdAndUpdate(id,req.body,{new:true});
      res.status(200).json({success:true,updateBrand})
   } catch (error) {
      throw new Error(error)
   }
})

//delete Brand
const deleteBrand = asyncHandler(async(req,res) => {
   const {id} = req.params;
   validateUserId(id)
   try {
      const deleteBrand = await Brand.findByIdAndDelete(id);
      res.status(200).json({success:true,message:"Brand has been deleted!!"})
   } catch (error) {
      throw new Error(error)
   }
})


module.exports = {createBrand,getAllBrand,updateBrand,deleteBrand,getBrand}