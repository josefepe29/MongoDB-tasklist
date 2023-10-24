const mongoose = require('mongoose')
const {model, Schema} = mongoose

const userSchema = new Schema({
    usuario: String,
    contrasena: String
});

const UserModel = model('users',userSchema);

module.exports = UserModel;