// Import all TypeDefs and Resolvers here
const { exampleType, exampleResolver } = require("./example");

const { gql } = require("apollo-server");
const { merge } = require("lodash");

/**
 @TODO find a better way to handle list of typedefs (array doesn't work)
* */
const typeDefs = gql`
  ${exampleType}
`;

const resolvers = merge(exampleResolver);

module.exports = { typeDefs, resolvers };
