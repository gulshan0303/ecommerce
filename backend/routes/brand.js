const express = require('express');
const { createBrand, getAllBrand, getBrand, updateBrand, deleteBrand } = require('../controller/brand');
const { authMiddleware, isAdmin } = require('../middleware/authMiddleware');

const router = express.Router();
router.get('/',getAllBrand);
router.get('/:id',getBrand)
router.post('/',authMiddleware, isAdmin, createBrand)
router.put('/:id',authMiddleware, isAdmin, updateBrand)
router.delete('/:id',authMiddleware, isAdmin, deleteBrand)

module.exports = router;