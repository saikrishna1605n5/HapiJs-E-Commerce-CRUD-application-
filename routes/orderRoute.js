const Joi = require('@hapi/joi');
const OrderController = require('../controllers/orderController');

const OrderJoiSchema = Joi.object({
  userId: Joi.string().required(),
  products: Joi.array().items(
    Joi.object({
        productId : Joi.string().required(),
         quantity : Joi.number().required(),
        
}),
)
}).unknown();

module.exports = [
  {
    method: 'POST',
    path: '/order',
    handler: OrderController.createNewOrder,
    config: {
      description: 'Create a new order',
      tags: ['api', 'Order'],
      auth: false,
      validate: {
        payload: OrderJoiSchema,
      },
    },
  },
  {
    method: 'GET',
    path: '/order',
    handler: OrderController.getAllOrders,
    config: {
      description: 'Get all Orders',
      tags: ['api', 'Order'],
      auth: false,
    },
  },
  {
    method: 'GET',
    path: '/order/{id}',
    handler: OrderController.getOrder,
    config: {
      description: 'Get order details',
      tags: ['api', 'order'],
      auth: false,
      validate: {
        params: Joi.object({
          id: Joi.string().required(),
        }),
      },
    },
  }
];
