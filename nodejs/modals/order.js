
var mongoose = require("mongoose");

mongoose.set('debug', true);

var Schema = mongoose.Schema;

var OrderSchema = new mongoose.Schema({
   
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cart',
    },
    finalprice: { type: Number },
    citytodeliver: { type: String },
    streettodeliver: { type: String },
    datetodeliver: { type: Date},
    dateoforder: { type: Date },
    digitofcradit: { type: Number},
 
});

var OrderSchema = mongoose.model('Order', OrderSchema);


module.exports = OrderSchema;
