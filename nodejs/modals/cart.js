
var mongoose = require("mongoose");

mongoose.set('debug', true);

var Schema = mongoose.Schema;

var CartSchema = new mongoose.Schema({
   
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
   date: { type: Date },
    

  

    // cart: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Carts',
    // },
    
});

var CartSchema = mongoose.model('Cart', CartSchema);
//  var product1 = new ProductSchema({ name: 'ssss' , catagory: '5dcffe2ac453ef3f1c174ee9' }) 
// product1.save(function (err, product1) {
//     if (err) return console.error(err);
//     console.log(product1);
    
// })

module.exports = CartSchema;
