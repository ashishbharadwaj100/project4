
var mongoose = require("mongoose");

mongoose.set('debug', true);

var Schema = mongoose.Schema;

var ItemSchema = new mongoose.Schema({
   
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
    },
    quantity: { type: Number },

    totalPrice: { type: Number },

    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cart',
    },
    
});

var ItemSchema = mongoose.model('Item', ItemSchema);
//  var product1 = new ProductSchema({ name: 'ssss' , catagory: '5dcffe2ac453ef3f1c174ee9' }) 
// product1.save(function (err, product1) {
//     if (err) return console.error(err);
//     console.log(product1);
    
// })

module.exports = ItemSchema;
