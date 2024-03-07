const NodeMediaServer = require("node-media-server");
const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");
const node_media_server = require('./media_server');
const dotenv = require('dotenv');
dotenv.config();

const MONGODB_KEY = process.env.MONGODB_KEY;

const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");

const server = new ApolloServer({
    typeDefs,
    resolvers
});

mongoose.connect(MONGODB_KEY, { useNewUrlParser: true })
    .then(() => {
        console.log("MongoDB connection successful");
        node_media_server.run();
        return server.listen({port: 3000});
    })
    .then((res) => {
        console.log(`Server running at ${res.url}`);
    });