
var mongoose = require("mongoose");

mongoose.set('debug', true);

var Schema = mongoose.Schema;

var ProductSchema = Schema({
    name: { type: String },
    price: {type: Number },
    catagory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Catagory',
        
    }
});

var ProductSchema = mongoose.model('Product', ProductSchema  )

module.exports = ProductSchema;
