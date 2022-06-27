const Joi = require('@hapi/joi');
const productsController = require('../controllers/productController');

const productJoiSchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number()
    .required(),
  description: Joi.string().required(),
}).unknown();

module.exports = [
  {
    method: 'POST',
    path: '/products',
    handler: productsController.createNewProduct,
    config: {
      description: 'Create a new Product',
      tags: ['api', 'products'],
      auth: false,
      validate: {
        payload: productJoiSchema,
      },
    },
  },
  {
    method: 'GET',
    path: '/products',
    handler: productsController.getAllProducts,
    config: {
      description: 'Get all products',
      tags: ['api', 'products'],
      auth: false,
    },
  },
  {
    method: 'GET',
    path: '/products/{id}',
    handler: productsController.getProduct,
    config: {
      description: 'Get product details',
      tags: ['api', 'product'],
      auth: false,
      validate: {
        params: Joi.object({
          id: Joi.string().required(),
        }),
      },
    },
  },
  {
    method: 'PUT',
    path: '/products/{id}',
    handler: productsController.updateProduct,
    config: {
      description: 'Update product details',
      tags: ['api', 'product'],
      auth: false,
      validate: {
        params: Joi.object({
          id: Joi.string().required(),
        }),
        payload: productJoiSchema,
      },
    },
  },
  {
    method: 'DELETE',
    path: '/products/{id}',
    handler: productsController.deleteProduct,
    config: {
      description: 'Delete product',
      tags: ['api', 'product'],
      auth: false,
      validate: {
        params: Joi.object({
          id: Joi.string().required(),
        }),
      },
    },
  },
];
