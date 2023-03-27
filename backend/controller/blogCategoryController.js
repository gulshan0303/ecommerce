const Category = require("../model/blogCategory");
const asyncHandler = require('express-async-handler');
const validateUserId = require("../utils/validateId");
//create category
const createCategory = asyncHandler(async(req,res) => {
   try {
      const category = await Category.create(req.body);
      res.status(201).json({success:true,category})
   } catch (error) {
      throw new Error(error)
   }
})

//get all category
const getAllCategory = asyncHandler(async(req,res) => {
   try {
      const category = await Category.find();
      res.status(200).json({success:true,category})
   } catch (error) {
      throw new Error(error)
   }
})

//get category
//update category
const getCategory = asyncHandler(async(req,res) => {
   const {id} = req.params;
   validateUserId(id)
   try {
      const category = await Category.findById(id);
      res.status(200).json({success:true,category})
   } catch (error) {
      throw new Error(error)
   }
})
//update category
const updateCategory = asyncHandler(async(req,res) => {
   const {id} = req.params;
   validateUserId(id)
   try {
      const updateCategory = await Category.findByIdAndUpdate(id,req.body,{new:true});
      res.status(200).json({success:true,updateCategory})
   } catch (error) {
      throw new Error(error)
   }
})

//delete category
const deleteCategory = asyncHandler(async(req,res) => {
   const {id} = req.params;
   validateUserId(id)
   try {
      const deleteCategory = await Category.findByIdAndDelete(id);
      res.status(200).json({success:true,message:"Category has been deleted!!"})
   } catch (error) {
      throw new Error(error)
   }
})


module.exports = {createCategory,getAllCategory,updateCategory,deleteCategory,getCategory}