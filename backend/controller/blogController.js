const Blog = require("../model/blog");
const asyncHandler = require("express-async-handler");
const validateUserId = require("../utils/validateId");

//create a blog
const createBlog = asyncHandler(async (req, res) => {
  try {
    const newBlog = await Blog.create(req.body);
    res.status(201).json({ success: true, newBlog });
  } catch (error) {
    throw new Error(error);
  }
});

//get all blogs;
const getAllBlogs = asyncHandler(async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(201).json({ success: true, blogs });
  } catch (error) {
    throw new Error(error);
  }
});

//update blogs
const updateBlogs = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateUserId(id);

  try {
    const updateBlog = await Blog.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json({ success: true, updateBlog });
  } catch (error) {
    throw new Error(error);
  }
});

//get blog
const getBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateUserId(id);

  try {
    const getBlog = await Blog.findById(id).populate("likes").populate("dislikes");
    const updateViews = await Blog.findByIdAndUpdate(
      id,
      {
        $inc: { views: 1 },
      },
      { new: true }
    );
    res.status(200).json({ success: true, getBlog });
  } catch (error) {
    throw new Error(error);
  }
});

//delete blog
const deleteBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateUserId(id);

  try {
    const deleteBlog = await Blog.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Blog has been deleted!!" });
  } catch (error) {
    throw new Error(error);
  }
});

//like a blog
const likeBlog = asyncHandler(async (req, res) => {
  const { blogId } = req.body;
  validateUserId(blogId);
  try {
    const blog = await Blog.findById(blogId);

    const loginUser = req?.user?._id;
    const isLiked = blog?.isLiked;

    //if user is already dislike the blog

    const alreadyDislike = await blog?.dislikes?.find(
      (userId) => userId.toString() === loginUser.toString()
    );

    if (alreadyDislike) {
      const blog = await Blog.findByIdAndUpdate(
        blogId,
        {
          $pull: { dislikes: loginUser },
          isDisLiked: false,
        },
        { new: true }
      );
      res.json(blog);
    }
    if (isLiked) {
      const blog = await Blog.findByIdAndUpdate(
        blogId,
        {
          $pull: { likes: loginUser },
          isLiked: false,
        },
        { new: true }
      );
      res.json(blog);
    } else {
      const blog = await Blog.findByIdAndUpdate(
        blogId,
        {
          $push: { likes: loginUser },
          isLiked: true,
        },
        { new: true }
      );
      res.json(blog);
    }
  } catch (error) {
    throw new Error(error);
  }
});

//dislike a blog
const disLikeBlog = asyncHandler(async (req, res) => {
  const { blogId } = req.body;
  validateUserId(blogId);
  try {
    const blog = await Blog.findById(blogId);

    const loginUser = req?.user?._id;
    const isDisLiked = blog?.isDisLiked;

    //if user is already dislike the blog

    const alreadylike = await blog?.likes?.find(
      (userId) => userId.toString() === loginUser.toString()
    );

    if (alreadylike) {
      const blog = await Blog.findByIdAndUpdate(
        blogId,
        {
          $pull: { likes: loginUser },
          isLiked: false,
        },
        { new: true }
      );
      res.json(blog);
    }
    if (isDisLiked) {
      const blog = await Blog.findByIdAndUpdate(
        blogId,
        {
          $pull: { dislikes: loginUser },
          isDisLiked: false,
        },
        { new: true }
      );
      res.json(blog);
    } else {
      const blog = await Blog.findByIdAndUpdate(
        blogId,
        {
          $push: { dislikes: loginUser },
          isDisLiked: true,
        },
        { new: true }
      );
      res.json(blog);
    }
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createBlog,
  getAllBlogs,
  updateBlogs,
  getBlog,
  deleteBlog,
  likeBlog,
  disLikeBlog,
};
