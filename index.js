'use strict';

const Hapi = require('@hapi/hapi');
const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const HapiSwagger = require('hapi-swagger');
const mongoose = require('mongoose');

const Config = require('./config');
const Routes = require('./routes');
const Pack = require('./package');

mongoose.connect(Config.database.uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true ,useFindAndModify:false});

let db = mongoose.connection;

db.on('connected', function callback() {
  console.log('Connected to DB.');
  init();
});

db.on('error', function() {
  console.log('Connection to DB failed!');
  process.exit(0);
});

db.on('disconnected', function(err) {
  console.log('Connection teminated to DB ', err);
  process.exit(0);
});

const init = async () => {
  const server = Hapi.server({
    host: Config.server.host,
    port: Config.server.port,
    routes: {
      cors: true,
      validate: {
        // If any Joi validations fail, it will send the proper error message to the user
        failAction: (request, h, err) => {
          throw err;
        },
      },
    },
  });

  const swaggerOptions = {
    info: {
      title: Config.swagger.title,
      version: Pack.version,
      contact: {
        name: Config.swagger.contact,
      },
    },
    schemes: ['http', 'https'],
    securityDefinitions: {
      jwt: {
        type: 'apiKey',
        name: 'Authorization',
        in: 'header',
      },
    },
    security: [{ jwt: [] }],
  };

  const goodOptions = {
    ops: {
      interval: 1000,
    },
    reporters: {
      console: [
        {
          module: '@hapi/good-squeeze',
          name: 'Squeeze',
          args: [{ log: '*', response: '*', ops: '*' }],
        },
        {
          module: '@hapi/good-console',
        },
        'stdout',
      ],
    },
  };

  await server.register([
    Inert,
    Vision,
    {
      plugin: HapiSwagger,
      options: swaggerOptions,
    },
    {
      plugin: require('@hapi/good'),
      options: goodOptions,
    },
  ]);

  try {
    await server.start();
    console.log(`Server running on ${server.info.uri}`);
    console.log(`Swagger documentation is running on ${server.info.uri}/documentation`);
  } catch (err) {
    console.log(err);
  }
  server.route(Routes);

  server.ext('onPostAuth', async (req, h) => {
    return h.continue;
  });
};

process.on('unhandledRejection', err => {
  console.error(err);
  process.exit(1);
});

// init();
