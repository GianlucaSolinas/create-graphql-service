// Import Server
const fastify = require("./server.js");

(async function() {
  // Plugins
  fastify.register(require("./plugins/apollo-server"));
  try {
    await fastify.listen(3000, "localhost");
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
})();
