const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const resolvers = {
  Query: {
    users: async (_, { ID }) => {
      return await User.findById(ID);
    },
    getUser: async (_, { amount }) => {
      return await User.find().limit(amount);
    },
  },
  Mutation: {
    registerUser: async (_, { registerUserInput: { name, email, password, color } }) => {
      const existingUser = await User.findOne().or([{ name }, { color }]);
    
      if (existingUser) {
        if (existingUser.name === name) {
          throw new Error(`The name ${name} is taken!`);
        } else {
          throw new Error(`The color ${color} is taken!`);
        }
      }
    
      const encryptedPassword = await bcrypt.hash(password, 10);
    
      const createdUser = new User({
        name,
        email,
        password: encryptedPassword,
      });
    
      const token = jwt.sign(
        {
          user_id: createdUser._id,
          streamKey: createdUser.streamKey,
        },
        "UNSAFE_STRING",
        {
          expiresIn: "2h",
        }
      );
    
      createdUser.tokenJWT = token;
    
      const res = await createdUser.save();
    
      return {
        id: res.id,
        ...res._doc,
      };
    },    

    loginUser: async (_, { loginUserInput: { email, password } }) => {
      const user = await User.findOne({ email });
    
      if (user && (await bcrypt.compare(password, user.password))) {
        const token = jwt.sign(
          {
            user_id: user._id,
            streamKey: user.streamKey,
            name: user.name
          },
          "UNSAFE_STRING",
          {
            expiresIn: "2h",
          }
        );
    
        user.tokenJWT = token;
    
        return {
          id: user.id,
          ...user._doc,
        };
      } else {
        throw new Error("Incorrect password!");
      }
    },    

    deleteUser: async (_, { ID }) => {
      const { deletedCount } = await User.deleteOne({ _id: ID });
      return deletedCount === 1;
    },
  },
};

module.exports = resolvers;