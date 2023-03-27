const express = require('express');
const { createCategory, getAllCategory, getCategory, updateCategory, deleteCategory } = require('../controller/blogCategoryController');
const { authMiddleware, isAdmin } = require('../middleware/authMiddleware');

const router = express.Router();
router.get('/all',getAllCategory);
router.get('/:id',getCategory)
router.post('/',authMiddleware, isAdmin, createCategory)
router.put('/:id',authMiddleware, isAdmin, updateCategory)
router.delete('/:id',authMiddleware, isAdmin, deleteCategory)

module.exports = router;