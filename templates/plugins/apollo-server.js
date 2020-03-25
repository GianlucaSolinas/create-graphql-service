// Create Apollo Server -> export as Fastify Plugin
const fp = require("fastify-plugin");
const { ApolloServer } = require("apollo-server-fastify");

const schema = require("../schema");

// const { checkSuperUser } = require("../utils/auth");

const isDevelopment = process.env.NODE_ENV === "development";

module.exports = fp(async (fastify, opts, next) => {
  const server = new ApolloServer({
    app: fastify,
    schema,
    context: async request => {
      return request;
    },
    playground: isDevelopment
      ? {
          settings: {
            "editor.theme": "light",
            "schema.polling.enable": false
          }
        }
      : false
  });
  fastify.register(server.createHandler());
  next();
});
