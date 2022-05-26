
var mongoose = require("mongoose");

mongoose.set('debug', true);

var Schema = mongoose.Schema;

var RoleSchema =  Schema({
    name: String ,
   
});

var RoleSchema = mongoose.model('Role', RoleSchema);
    // var user1 = new UserSchema({ name: 'yaaasss' , role: '5dcffdfac453ef3f1c174ee8' }) 
    // user1.save(function (err, user1) {
    //     if (err) return console.error(err);
    //     console.log(user1);
        
    // })
module.exports = RoleSchema

