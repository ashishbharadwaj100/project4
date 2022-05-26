import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service'
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../interfaces/user.interface';
import { SerPro4Service } from '../../services/ser-pro4.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User;
  data: "";
  productQun;
  orderQun;
  loginForm: FormGroup;
  
  submitted = false;
  constructor(public _ApiService: SerPro4Service, private _authService: AuthService,private formBuilder: FormBuilder,
    private _route: ActivatedRoute, private _router: Router) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
     
      
         
    }, {
     
    });
    /// get Quantity of all orders and products ///
    this._ApiService.getAllProductsAndOrders().subscribe(data => {
      var product = Object.keys(data['data']['product']);
      this.productQun = product.length;
      var order = Object.keys(data['data']['order']);
      this.orderQun = order.length;
    })
    
  }
  get f() { return this.loginForm.controls; }
  login() {
    this.submitted = true;
    var username = this.loginForm.value.username;
    var password = this.loginForm.value.password;
    this.user = { username, password }
    console.log(this.user);
    
    this._authService.login(this.user).subscribe(data => {
      if (data['user'] == 'notValid') {
        this._authService.isUserNameNpasswordOK = true;
      } else {
        this._authService.isUserNameNpasswordOK = false;
      }
      if (data['usercart']['role'] == 'admin') {
        this._authService.isAdmin = true;
      } else {
        /// for user login that have open shopping cart ///
        this._ApiService.cartItems = data['usercart']['item']
        this._authService.userId = data['usercart']['userId'];
        this._authService.cartId = data['usercart']['cartId'];
        var totalPriceOfCart = data['usercart']['totalPriceOfCart'];
        var dateOfCart = data['usercart']['date'];
        if (data['usercart']['cart'] == "is exist" && data['usercart']['totalPriceOfCart'] != undefined) {
          this._authService.cartId = data['usercart']['cartId'];
          this._authService.isCartOpen = true;
          this._ApiService.getUserCart().subscribe(data => {
          this._ApiService.UserCart = data['data']
             }
            )
          alert(`There is a Open Shooping Cart ! \n Total Price: ${totalPriceOfCart}\n Date: ${dateOfCart}`)
        } else {
          /// for user that have no shopping cart opened ///
          this._authService.userId = data['usercart']['userId'];
          this._authService.cartId = data['usercart']['cartId'];
          this._authService.isCartNotExist = true;
          this._ApiService.getUserOrderedCart().subscribe(data => {
            let userCartOrder = data['data'];
            let finalprice = userCartOrder[0].finalprice
            let citytodeliver = userCartOrder[0].citytodeliver
            let streettodeliver = userCartOrder[0].streettodeliver;
            let datetodeliver = userCartOrder[0].datetodeliver;
            let dateoforder = userCartOrder[0].dateoforder;

            alert(`User Last Order \n Final Price: ${finalprice}\n City: ${citytodeliver}\n Street: ${streettodeliver}
            \n Date of Deliver: ${datetodeliver}\n Date of Order: ${dateoforder}`);
          })
        }
      }
      if (data['token']) {
        this._authService.isLogIn = true;
         this._authService.name = username;
        sessionStorage.setItem("token", data['token']);
        } else {
       
          this._authService.isUserNameNpasswordOK = true;
      }
     })
  }
}
