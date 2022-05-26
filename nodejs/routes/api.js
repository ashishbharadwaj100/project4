var express = require('express');
var router = express.Router();
var ProductModal = require('../modals/product');
var CatagoryModal = require('../modals/catagory');
var ItemModal = require('../modals/item');
var OrderModal = require('../modals/order')
var CartModal = require('../modals/cart');
var RolesModal = require('../modals/role');
var isUserAuth = require('../middleware/middleware');

/// get product ///
router.get('/product', function(req, res, next) {
  ProductModal.find({}).populate('catagory').exec(function (err, data) {
    debugger;
    res.json({ page: 'Pro', data });
  })
});

/// get catagory //
router.get('/catagory', function(req, res, next) {
  CatagoryModal.find(function (err, data) {
    debugger;
    res.json({ page: 'Pro', data });
  })
});

 /// get role ///
router.get('/role', function(req, res, next) {
  RolesModal.find(function (err, data) {
    res.json({ page: 'Pro', data });
  })
})

/// get all product by catagory
router.get('/allproductcatagory/:id',[isUserAuth] , function (req, res, next) {
  id = req.params.id;
  ProductModal.find({catagory:id}).populate('catagory').exec(function (err, data) {
    res.json({ page: 'Pro', data });
  })
});

/// post product quantity //
router.post('/addproduct/:id', function (req, res, next) {
  id = req.params.id;
  quantity = req.body.qun
  price = req.body.price;
  totalPrice = price * quantity;
  cartId = req.body.cart;
    
  ItemModal.create({ product: id, quantity: quantity, totalPrice: totalPrice, cart: cartId },
      function (err, data) {
     if (err) return console.error(err);
      debugger;
    res.send(data)
    })
})
  
////// get User Cart ///

router.get('/usercart/:id', function (req, res, next) {
  id = req.params.id;
  ItemModal.find({ cart: id }).populate('product').exec(function (err, data) {
    if (err) {
      total = 0;
      res.json({ data, total })
    } else {
      var totalPriceOfCart = data.map(function (total) {
        return total.totalPrice;
      });
      var total = 0;
      for (var i in totalPriceOfCart) { total += totalPriceOfCart[i]; }
     res.json({ data, total })
      debugger;
     }
    })

});
  
// get product by name //

router.get('/product/:name', function (req, res, next) {
  name = req.params.name
  ProductModal.find({ name: name }).exec(function (err, data) {
   res.json({ data });
  })
});
//// delete item /// 
router.post('/deleteitem/:id', function (req, res, next) {
  id = req.params.id
   ItemModal.deleteOne({ _id: id }).populate('product').exec(function (err, data) {
   });
});

// delete user cart after order ///
router.post('/deleteusercart/:id', function (req, res, next) {
  id = req.params.id
   CartModal.deleteOne({ _id: id }).populate('product').exec(function (err, data) {
  });
});

/// delete all items ///
router.post('/deleteallitems/:id', function (req, res, next) {
  id = req.params.id
  ItemModal.deleteMany({ cart: id }).populate('product').exec(function (err, data) {
    });
});

//// post order ///
router.post('/postorder/:id', function (req, res, next) {
  id = req.params.id
  order = req.body;
 ItemModal.find({ cart: id }).populate('product').exec(function (err, data) {
    var totalPriceOfCart = data.map(function (total) {
    return total.totalPrice;
  });
     var total = 0;
     for (var i in totalPriceOfCart) { total += totalPriceOfCart[i]; }
    OrderModal.create({
         user: order.userId, cart: id, finalprice: total,
         citytodeliver: order.orderInfo.city,
         streettodeliver: order.orderInfo.street, datetodeliver: order.orderInfo.date,
         dateoforder: new Date(Date.now()).toISOString(), digitofcradit: order.orderInfo.craditcard 
    }, function (err, data) {
   });
  })
 });
/// get all orders //
router.get('/getallproductsandorders', function (req, res, next) {
  OrderModal.find({}).exec(function (err, data) {
   order = data
  })
  ProductModal.find({}).exec(function (err, data) {
   product = data
    var data = { order, product };
   res.json({ data });
    } )
})
////// get User Cart product name and total ///

router.get('/usercartproducts/:id', function (req, res, next) {
  id = req.params.id;
  ItemModal.find({ cart: id }).populate('product').exec(function (err, data) {
    if (err) {
      total = 0;
      res.json({ data, total })
    } else {
      var totalPriceOfCart = data.map(function (total) {
        return total.totalPrice;
      });
      var total = 0;
      for (var i in totalPriceOfCart) { total += totalPriceOfCart[i]; }
      res.json({ data, total })
     }
    })
});
//// add new product ///
  
router.post('/addnewproduct/', function (req, res, next) {
  console.log(req.body);
  let name = req.body.name;
  let price = req.body.price;
  let catagory = req.body.catagory;
  ProductModal.create({ name: name, price: price, catagory: catagory },function (err, data) {
    data;
     res.send({ data });
   }) 
})

router.post('/editproduct/', function (req, res, next) {
  console.log(req.body);
  let oldProductId = req.body.oldProduct
  let name = req.body.newProduct.name;
  let price = req.body.newProduct.price;
  let catagory = req.body.newProduct.catagory;
  console.log(name, price, catagory);
  
  ProductModal.deleteOne({ _id: oldProductId }).populate('product').exec(function (err, data) {
    console.log(data);
    ProductModal.create({ name: name, price: price, catagory: catagory }, function (err, data) {
      data;
      res.send({ data });
    });
  
  });
});

module.exports = router;
