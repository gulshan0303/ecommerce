const User = require("../model/userModel");
const Cart = require("../model/cart");
const Order = require("../model/order");
const Product = require("../model/product");
const uniqid = require('uniqid');
const validateUserId = require("../utils/validateId");
const asyncHandler = require("express-async-handler");

const createOrder = asyncHandler(async(req, res) => {
    const { _id } = req.user;
    validateUserId(_id);
    const { COD, couponApplied } = req.body;
    try {
      if (!COD) throw new Error("create cash order failed!!");
      const user = await User.findById(_id);
      let userCart = await Cart.findOne({ orderBy: user?._id });
      let finalAmount = 0;
      if (couponApplied && userCart.totalAfterDiscount) {
        finalAmount = userCart.totalAfterDiscount;
      } else {
        finalAmount = userCart.cartTotal;
      }
      let newOrder = await new Order({
        product: userCart.products,
        paymentIntent: {
          id: uniqid(),
          method: "COD",
          amount: finalAmount,
          status: "Cash On Delivery",
          created: Date.now(),
          currency: "usd",
          orderBy: user?._id,
          orderStatus: "Cash On Delivery"
        },
        orderBy: user?._id
      }).save();
      let update = userCart.products.map((item) => {
        return {
          updateOne: {
            filter: { _id: item.product._id },
            update: { $inc: { quantity: -item.count, sold: +item.count } },
          },
        };
      });
      const updated = await Product.bulkWrite(update, {});
      res.json({ message: "success", newOrder });
    } catch (error) {
      throw new Error(error);
    }
  });

const getOrder = asyncHandler(async(req, res) => {
    const { _id } = req.user;
    validateUserId(_id);
   
    try {
     const order = await Order.findOne({orderBy:_id}).populate("product.product").exec();
     res.json({order})
    } catch (error) {
      throw new Error(error);
    }
  });

  const updateOrder = asyncHandler(async(req, res) => {
    const { id } = req.params;
    const {status} = req.body;
    validateUserId(id);
   
    try {
     const order = await Order.findOneAndUpdate(id,{paymentIntent:{
        status:status,
        orderStatus:status
     }},{new:true});
     res.json({order})
    } catch (error) {
      throw new Error(error);
    }
  });  


  

module.exports ={createOrder,getOrder,updateOrder}