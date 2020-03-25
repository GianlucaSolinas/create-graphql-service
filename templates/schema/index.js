// Entry point for API TypeDefs and Resolvers
const { buildFederatedSchema } = require("@apollo/federation");

const { resolvers, typeDefs } = require("../api");

// Export schema as Federation/Service
module.exports = buildFederatedSchema([
  {
    typeDefs,
    resolvers: resolvers
  }
]);
