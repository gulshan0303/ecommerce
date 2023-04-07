const express = require('express');
const { createBlog, getAllBlogs, updateBlogs, getBlog, deleteBlog, likeBlog, disLikeBlog, uploadImages } = require('../controller/blogController');
const { authMiddleware, isAdmin } = require('../middleware/authMiddleware');
const { uploadPhoto,blogImageResize } = require('../middleware/uploadImage');
const router = express.Router();

router.get('/all', getAllBlogs)
router.get('/:id', getBlog)
router.put('/like',authMiddleware, likeBlog)
router.put('/upload/:id',authMiddleware,isAdmin, uploadPhoto.array('images',2),blogImageResize,uploadImages)
router.put('/dislike',authMiddleware, disLikeBlog) 
router.post('/',authMiddleware, isAdmin, createBlog )
router.put('/:id',authMiddleware, isAdmin, updateBlogs )
router.delete('/:id',authMiddleware, isAdmin, deleteBlog )
module.exports = router