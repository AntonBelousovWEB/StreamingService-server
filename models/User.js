const { model, Schema } = require('mongoose');

const userSchema = new Schema({
    name: String,
    email: String,
    password: String,
    tokenJWT: String,
    streamKey: String,
});

module.exports = model('User', userSchema);