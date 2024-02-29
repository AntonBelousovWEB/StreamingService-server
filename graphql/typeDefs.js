const { gql } = require('apollo-server');

module.exports = gql`
    type User {
        name: String
        email: String
        password: String
        tokenJWT: String
        streamKey: String
    }

    input RegisterUserInput {
        name: String
        email: String
        password: String
    }

    input LoginUserInput {
        email: String
        password: String
    }      

    type Query {
        users(ID: ID!): User!
        getUser(amount: Int): [User]
    }

    type Mutation {
        registerUser(registerUserInput: RegisterUserInput): User!
        loginUser(loginUserInput: LoginUserInput): User!
        deleteUser(ID: ID!): Boolean
    }
`