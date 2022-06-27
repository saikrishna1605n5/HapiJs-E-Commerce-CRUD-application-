
const Boom = require('@hapi/boom');

const Config = require('../config');
const OrderModel = require('../models/orderModel');
const factory = require("./handlefactory");

exports.getAllOrders = factory.getAll(OrderModel);


exports.getOrder = factory.getOneWithPopulate(OrderModel,{path : 'products.productId'});




exports.createNewOrder = async (req, res)=> {
    try {
        const order = await OrderModel.create(req.payload);
        const doc1 = await OrderModel.findById(order._id).populate("products.productId");

        const subtotal = doc1.products.reduce((r, d) => r + ((d.productId.price)*(d.quantity)), 0);
        const orderOfUser = JSON.parse(JSON.stringify(doc1));
    
        const doc =  await OrderModel.findByIdAndUpdate(orderOfUser._id,
            { $set: { "subTotal": subtotal }},
            {
                new: true, 
                runValidators : true
            }).populate("products.productId");
        
        return { status:'success', data: doc, statusCode: 200 };
    } catch (e) {
      console.log(e.message);
      return Boom.badImplementation();
    }
  };
