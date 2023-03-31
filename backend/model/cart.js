const mongoose = require('mongoose');

// Declare the Schema of the Mongo model
const cartSchema = new mongoose.Schema({
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
      },
      count: Number,
      color: String,
      price: Number,
    },
  ],
  cartTotal: {
    type: Number,
  },
  totalAfterDiscount:{
    type:Number,
    default:0
  },
  orderBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  orderStatus: {
    type: String,
    enum: [
      'Not processed',
      'Cash On Delivery',
      'Processing',
      'Dispatched',
      'Delivered',
      'Cancelled',
    ],
  },
}, { timestamps: true });

//Export the model
module.exports = mongoose.model('Cart', cartSchema);