const Product = require("../model/product");
const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const User = require("../model/userModel");
const validateUserId = require("../utils/validateId");
const cloudinaryUpload = require("../utils/clodinary");
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
  const page = req.query.page || 1;
  const limit = req.query.limit || null;
  const orCond = [];

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

  if (req.query.minprice || req.query.maxprice) {
    const filter = {};
    if (req.query.minprice) {
      filter.$gte = Number(req.query.minprice);
    }
    if (req.query.maxprice) {
      filter.$lte = Number(req.query.maxprice);
    }
    orCond.push({ price: filter });
  }

  try {
    const skip = (page - 1) * limit;
    const query = orCond.length ? { $and: orCond } : {};
    const result = await Product.find(query)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const docCount = await Product.countDocuments(query);
    res.json({
      status: "success!",
      page,
      limit,
      total: docCount,
      data: result,
    });
  } catch (error) {
    throw new Error(error);
  }
});

//wishlist
const wishlist = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { productId } = req.body;

  try {
    const user = await User.findById(_id);
    const alreadyAdd = await user.wishList.find(
      (id) => id.toString() === productId
    );
    if (alreadyAdd) {
      const product = await User.findByIdAndUpdate(
        _id,
        {
          $pull: { wishList: productId },
        },
        { new: true }
      );
      res.json(product);
    } else {
      const product = await User.findByIdAndUpdate(
        _id,
        {
          $push: { wishList: productId },
        },
        { new: true }
      );
      res.json(product);
    }
  } catch (error) {
    throw new Error(error);
  }
});

//ratings
const ratings = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { star, productId,comment } = req.body;

  try {
    const product = await Product.findById(productId);

    let alreadyRated = await product.ratings.find(
      (userId) => userId.postedBy.toString === _id.toString()
    );
    if (alreadyRated) {
      const updateRate = await Product.updateOne(
        { ratings: { $eleMatch: alreadyRated } },
        {
          $set: { "ratings.$.star": star,"ratings.$.comment": comment },
        },
        {
          new: true,
        }
      );
    } else {
      const productRatings = await Product.findByIdAndUpdate(
        productId,
        {
          $push: {
            ratings: {
              star: star,
              comment:comment,
              postedBy: _id,
            },
          },
        },
        { new: true }
      );
    }
    const getallrating = await Product.findById(productId);
    let totalRating = getallrating.ratings.length;
    let ratingsum = getallrating.ratings.map(item => item.star).reduce((prev,curr) => prev+curr,0);
    let actualRating = Math.round(ratingsum/totalRating);
    const finalRating = await Product.findByIdAndUpdate(productId,{totalRating:actualRating},{new:true})
    res.json(finalRating);
  } catch (error) {
    throw new Error(error);
  }
});

const uploadImages = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateUserId(id);
  try {
    const uploader = (path) => cloudinaryUpload(path);
    const urls = [];
    const files = req.files;
    for (file of files) {
      const { path } = file;
      const newPath = await uploader(path);
      urls.push(newPath);
    }
    const findProduct = await Product.findByIdAndUpdate(id, {
      images: urls.map((file) => {
        return file;
      }),
    });
    res.json(findProduct);
  } catch (error) {
    throw new Error(error);
  }
});


module.exports = {
  createProduct,
  getProduct,
  getAllProduct,
  updateProduct,
  deleteProduct,
  wishlist,
  ratings,
  uploadImages
};
