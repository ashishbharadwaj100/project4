
var mongoose = require("mongoose");

mongoose.set('debug', true);

var Schema = mongoose.Schema;
ObjectId = Schema.ObjectId;

var UserSchema = new Schema({
    id_number: String,
    email: String,
    name: String,
    password: String,
    passwordconfirm: String,
    role: Number,
    city: String,
    street: String,
    u_name: String,
    f_name: String,
    l_name: String, 
    
});
var UserSchema = mongoose.model('User', UserSchema);

module.exports = UserSchema

