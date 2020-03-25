// Require the fastify framework and instantiate it
const fastify = require("fastify")({
  logger: {
    prettyPrint: { translateTime: true }
  }
});

module.exports = fastify;
