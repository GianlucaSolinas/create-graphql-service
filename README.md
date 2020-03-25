# Create GraphQL Service

Create a [GraphQL Federation](https://www.apollographql.com/docs/apollo-server/federation/introduction/) without configurations.

### Stack ###
 - [`Fastify`](https://github.com/fastify/fastify)
 - [`Apollo Server (Fastify integration/plugin)`](https://github.com/apollographql/apollo-server/tree/master/packages/apollo-server-fastify)
 
 
 ## Get started ##
 
 1. Install globally
 ```
 npm install -g create-graphql-service
 ```
 
 2. Create your service
 ```
 npx create-graphql-service my-graphql-service-name
 
 // You'll be asked to fill the package.json prompt (as you do after running "npm init")
 // Packages will be installed automatically and initial code scaffolding will be created
 ```
 
 3. Then you can finally start your service by running
 ```
 cd my-graphql-service-name
 
 // npm start:dev will add "development" as global variable
 npm start:dev
 ```
 
Then open [http://localhost:3000/graphql](http://localhost:3000/graphql) to see and test your new service on [GraphQL Playground](https://github.com/prisma-labs/graphql-playground).

### Folder structure ###
```
src/
├── index.js              # App entry-point (starts server)
├── server.js             # Fastify instantiation
│
├── api
│   ├── example           # Example of an API entity folder
│   │   ├── index.js
│   │   └── resolver.js
│   └── index.js          # API entry-point (this file exports ALL API resolvers and TypeDefs)
│
├── plugins               # Fastify plugins
│   └── apollo-server.js
│
└── schema                # Schemas entry-point (exports a GraphQL Federated Schema)
    └── index.js             

```
