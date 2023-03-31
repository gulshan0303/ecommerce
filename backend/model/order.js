const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    product: [
      {
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
          },
        count: Number,
        color: String,
      },
    ],
    paymentIntent: {
      id: String,
      method: String,
      amount: Number,
      status: {
        type: String,
        default: "Cash On Delivery",
        enum: ["Cash On Delivery", "Processing", "Dispatched", "Delivered", "Cancelled"],
      },
      created: {
        type: Date,
        default: Date.now,
      },
      currency: {
        type: String,
        default: "usd",
      },
      orderBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      orderStatus: {
        type: String,
        default: "Not processed",
        enum: ["Not processed", "Cash On Delivery", "Processing", "Dispatched", "Delivered", "Cancelled"],
      },
    },
    orderBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  }, { timestamps: true });

  module.exports = mongoose.model('Order', orderSchema);
  