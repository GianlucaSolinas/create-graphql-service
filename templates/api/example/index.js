// Entry-point for this entity API
const { exampleType, exampleResolver } = require("./resolver");

module.exports = {
  // Model or Collection if using MongoDB/Mongoose,
  // Some type of controller with functional methods
  exampleType,
  exampleResolver
};
