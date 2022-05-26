var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();
var UserModal = require('../modals/user');
var isUserAuth = require('../middleware/middleware');
var validator = require("email-validator");
var CartModal = require('../modals/cart');
var ItemModal = require('../modals/item');
var OrderModal = require('../modals/order');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

function isUser(user) {
  return user.username === user;
}
///  post login ///
router.post('/login', function (req, res, next) {
  let { username, password } = req.body;
  var total = "";
  var totalPriceOfCart = "";
  
  UserModal.find({ u_name: username, password: password }).exec(function (err, data) {
    /// if user login is not valid /////
    if (data.length == 0) {
      res.json({ user: 'notValid' })
    } else {
      /// if user is admin ////
      if (data[0]['role'] == 1) {
        const user = { username, password }
        var userId = data[0]._id;
        const usercart = { user, userId, role: 'admin' }
        jwt.sign({ user }, 'secretKey', function (err, token) {
          if (err) res.sendStatus(403);
          res.json({ token, usercart })
        })
      } else {
        ///// user not admin. get user data if exist and jwt ///
        if (data.length > 0) {
          const user = { username, password }
          var userId = data[0]._id;
          /// check if user have open cart //
          CartModal.find({ user: userId }).exec(function (err, data) {
            if (data.length > 0) {
              var cartId = data[0]._id;
              var cartDate = data[0].date;
              ItemModal.find({ cart: cartId }).exec(function (err, data) {
                var totalPriceOfCart = data.map(function (total) {
                  return total.totalPrice;
                });
                var total = 0;
                for (var i in totalPriceOfCart) { total += totalPriceOfCart[i]; }
                
                var usercart = {
                  cart: "is exist", totalPriceOfCart: total, date: cartDate,
                  cartId: cartId, userId: userId, item: data, role: 'user'
                }
                // console.log(usercart);
                jwt.sign({ user }, 'secretKey', function (err, token) {
                  if (err) res.sendStatus(403);
                  console.log(usercart);
                  res.json({ token, usercart })
                })
              })
            } else {
              //// create new user cart and jwt sign
              CartModal.create({ user: userId, date: new Date(Date.now()).toISOString() }, function (err, data) {
                if (err) return console.error(err);
                debugger;
                var cartId = data['_id'];
                usercart = { cart: "now created", cartId: cartId, userId: userId, role: 'user' }
                  
                jwt.sign({ user }, 'secretKey', function (err, token) {
                  if (err) res.sendStatus(403);
                  // console.log(usercart);
                  res.json({ token, usercart })
                })
              }
             )
            }}
          )}
      } }
  })
})

// CHECK ID IS NOT EXIST AND EMAIL IS VALID AND NEXT TO 2 PAGE //
function isUser(user) {
  return user.username === user;
}

router.post('/register', function (req, res, next) {
  console.log('aa');
  
  let id  = req.body.id;
  console.log(id);
  UserModal.find({ id_number: id }).exec(function (err, data) {
    debugger;
    console.log(data);
    
   if (data.length == 0) {
      const isIdInUse = "id not in use";
      const data = ({ isIdInUse })
      res.json({ data })
    } else {
      const isIdInUse = "id in use";
      const data = { isIdInUse }
      res.json({ data })
    }
  });
});
// After First Register page 1 , Register New User And JWT // 
router.post('/registernewuser', function (req, res, next) {

  var id = req.body.id;
  var email = req.body.email;
  var password = req.body.password;
  var passwordconfirm = req.body.passwordconfirm;
  var city = req.body.city;
  var street = req.body.street;
  var u_name = req.body.u_name;
  var f_name = req.body.f_name;
  var l_name = req.body.l_name;
  var role = '0';
 
  var newUser = new UserModal({
    id_number: id, email, password, passwordconfirm,
    city, street, u_name, f_name, l_name,role
  });
  newUser.save((err, data) => {
    let username = data.u_name
    let password = data.password
    const user = { username, password }
    console.log(data);
    userId = data['_id'];  
    console.log(userId);
    
 
    CartModal.create({ user: userId, date: new Date(Date.now()).toISOString() }, function (err, data) {
        if (err) return console.error(err);
        debugger;
        console.log(data);
        var cartId = data['_id'];
        var usercart = { cart: "is exist", cartId: cartId ,userId : userId  }
    
    jwt.sign({ user }, 'secretKey', function (err, token) {
      if (err) res.sendStatus(403);
      console.log(token);
     
      res.json({ token , usercart : usercart })
    })
  })
  })
})
/// get user ordered cart ////
router.get('/getuserorderedcart/:id', function (req, res, next) {
  id = req.params.id
  console.log(id);
   OrderModal.find({ user: id }).populate('product').exec(function (err, data) {
    debugger;
    res.json({ data });
  });
});

    
 



module.exports = router;
