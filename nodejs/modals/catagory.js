var mongoose = require('mongoose');
mongoose.set('debug', true);
var Schema = mongoose.Schema;

var CatagorySchema = Schema({
    name: String
})


module.exports = mongoose.model('Catagory', CatagorySchema );

