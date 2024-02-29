const NodeMediaServer = require("node-media-server");
const { ApolloServer } = require("apollo-server");
const { config } = require('./mediaServer/config');
const mongoose = require("mongoose");
const dotenv = require('dotenv');
dotenv.config();

const MONGODB_KEY = process.env.MONGODB_KEY;

const nms = new NodeMediaServer(config);
nms.run();

const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");

const server = new ApolloServer({
    typeDefs,
    resolvers
});

mongoose.connect(MONGODB_KEY, { useNewUrlParser: true })
    .then(() => {
        console.log("MongoDB connection successful");
        return server.listen({port: 3000});
    })
    .then((res) => {
        console.log(`Server running at ${res.url}`);
    });