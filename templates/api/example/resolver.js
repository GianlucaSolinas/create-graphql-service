const { gql } = require("apollo-server");

// Define types, queries and mutations
const exampleType = gql`
  """
  Example type description
  """
  type Cheer {
    """
    Example field description
    """
    hello: String
  }

  # Queries
  extend type Query {
    saymyname(name: String!): String
  }

  #  Mutations
  #   extend type Mutation {
  #       ...
  #   }
`;

// Define resolvers
const exampleResolver = {
  Cheer: {
    hello: () => "Hello GraphQL!"
  },
  Query: {
    saymyname: (parent, args) => `Hello ${args.name}!`
  }
};

module.exports = { exampleType, exampleResolver };
