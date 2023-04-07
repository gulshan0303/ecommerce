const express = require('express');
const {isAdmin,authMiddleware} = require("../middleware/authMiddleware")
const { createProduct, getProduct, getAllProduct, updateProduct, deleteProduct, wishlist, ratings, uploadImages } = require('../controller/product');
const { uploadPhoto,productImgResize } = require('../middleware/uploadImage');
const router = express.Router();

router.post('/create',authMiddleware, isAdmin,createProduct)
router.get('/all',getAllProduct)
router.get('/:id',getProduct)
router.put('/upload/:id',authMiddleware,isAdmin, uploadPhoto.array('image',10),productImgResize,uploadImages)
router.put('/wishlist',authMiddleware,wishlist)
router.put('/rating',authMiddleware,ratings)

router.put('/:id',authMiddleware, isAdmin,updateProduct)
router.delete('/:id',authMiddleware, isAdmin,deleteProduct)


module.exports = router