const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let OrderSchema = new Schema(
  {
    userId:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
  },
  products: [{
    productId: {
          type: mongoose.Schema.Types.ObjectId,
           ref: "Product",
        },
    quantity: Number,
  }],
  subTotal:{
    type:Number,
  }
  },
  { timestamps: true },
);

module.exports = mongoose.model('Order', OrderSchema);
