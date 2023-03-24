const Product = require("../model/product");
const asyncHandler = require("express-async-handler");
const slugify = require("slugify");

//create product
const createProduct = asyncHandler(async (req, res) => {
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const product = await Product.create(req.body);
    res.status(201).json({ success: true, product });
  } catch (error) {
    throw new Error(error);
  }
});

//update a product
const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const updateProduct = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json({ success: true, updateProduct });
  } catch (error) {
    throw new Error(error);
  }
});

//delete a product
const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const deleteProduct = await Product.findByIdAndDelete(id);
    res
      .status(200)
      .json({ success: true, message: "Product has been deleted!!" });
  } catch (error) {
    throw new Error(error);
  }
});

//get product by Id
const getProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    res.status(201).json({ success: true, product });
  } catch (error) {
    throw new Error(error);
  }
});

//get all product
const getAllProduct = asyncHandler(async (req, res) => {
  // try {
  //     const product = await Product.find();
  //     res.status(201).json({success:true,product});
  // } catch (error) {
  //     throw new Error(error)
  // }
  let { page, limit } = req.query;
  if (!page) page = 1;
  if (!limit) limit = null;
  let orCond = [];
  if (req.query.title) {
    orCond.push({ title: new RegExp(req.query.title, "gi") });
  }
  if (req.query.category) {
    orCond.push({ category: new RegExp(req.query.category, "gi") });
  }
  if (req.query.brand) {
    orCond.push({ brand: new RegExp(req.query.brand, "gi") });
  }
  if (req.query.color) {
    orCond.push({ color: new RegExp(req.query.color, "gi") });
  }
  if (req.query.price) {
    orCond.push({ price: Number(req.query.price) });
  }
  try {
    const skip = (page - 1) * limit;
    const result = await Product.find({
      $and: [orCond.length ? { $and: orCond } : {}],
    })
      .skip(skip)
      .limit(limit)
      .collation({ locale: "en", strength: 2 })
      .sort({ updatedAt: -1 });

    const docCount = await Product.find({
      $and: [orCond.length ? { $and: orCond } : {}],
    })
      .collation({ locale: "en", strength: 2 })
      .countDocuments();
    res
      .status(200)
      .json({
        status: "success!",
        page: page,
        limit: limit,
        total: docCount,
        data: result,
      });
  } catch (err) {
    throw new Error(err);
  }
});

module.exports = {
  createProduct,
  getProduct,
  getAllProduct,
  updateProduct,
  deleteProduct,
};
