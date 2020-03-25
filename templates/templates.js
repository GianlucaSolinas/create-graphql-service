module.exports = {
  structure: [
    // API
    {
      name: "api",
      type: "folder",
      children: [
        {
          type: "folder",
          name: "example",
          children: [
            { type: "file", name: "index.js" },
            { type: "file", name: "resolver.js" }
          ]
        },
        { type: "file", name: "index.js" }
      ]
    },
    // PLUGINS
    {
      type: "folder",
      name: "plugins",
      children: [{ type: "file", name: "apollo-server.js" }]
    },
    // SCHEMA
    {
      type: "folder",
      name: "schema",
      children: [{ type: "file", name: "index.js" }]
    },
    // index.js
    {
      type: "file",
      name: "index.js"
    },
    // server.js
    {
      type: "file",
      name: "server.js"
    }
  ]
};
