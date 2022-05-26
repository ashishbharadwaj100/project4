import { HttpClient , HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import { AuthService } from '../services/auth.service';
// import { Observable, Subject } from 'rxjs';
import { User } from '../interfaces/user.interface';
import { tap } from 'rxjs/operators';
import { AdminSideBarComponent } from '../components/admin-side-bar/admin-side-bar.component';
@Injectable({
  providedIn: 'root'
})
export class SerPro4Service {
  User: User;
  public name: [];
  public item;
  cartId;
  public orderIsHidden: boolean = true;
  public shoopingIsHidden: boolean = true;
  public AllProducts;
  public cartItems;
  public UserCart: [];
  public adminProductData;
  public userProductData;
  private adminProduct = new BehaviorSubject<any>('s');
  currentProduct = this.adminProduct.asObservable();
  
  public userProduct = new BehaviorSubject<any>('b');
  currentUserProduct = this.userProduct.asObservable();
   
   
  constructor(private _httpClient: HttpClient, private _authService: AuthService ) { }
  
  changeProduct(product: any) {
    this.adminProduct.next(product);
    console.log(product);
    console.log(this.currentProduct.source['_value']['name']);
    

  }
  changeUserProduct(data: any) {
  
    console.log(data);
    this.userProduct.next(data);
    console.log(this.userProduct);
  }  
  

  public getAllCatagories() {
    return this._httpClient.get(`http://localhost:3000/api/catagory`);
  }
  public getAllProducts() {
    return this._httpClient.get(`http://localhost:5000/api/product`);
  }
  
  getSingleCatagory(id) {
     var t = sessionStorage.getItem("token");
    const HttpOptions = {
      headers: new HttpHeaders().set("Autorization", "Bearer " + t)};
    return this._httpClient.get(`http://localhost:3000/api/allproductcatagory/` + id , HttpOptions);   
  }
  
  postSingleProduct(id, result) {
  
    var productPrice = id['price']
    var productId = id['_id'];
    var quantity = result;
    var cartId = this._authService.cartId;
    var data = {"qun" : quantity , "price" : productPrice , 'cart' : cartId }
    return this._httpClient.post(`http://localhost:3000/api/addproduct/` + productId , data );
  }
 
  getUserCart() {
    this.cartId = this._authService.cartId;
    return this._httpClient.get(`http://localhost:3000/api/usercart/` + this.cartId);
  }
  
   getProduct(name)  {
    this.name = name;
   }
  
  getProduct1(name) {
    this.name = name;
    return this._httpClient.get(`http://localhost:3000/api/product/` + name);
  }
  order() {
    this.orderIsHidden = false;
    this.shoopingIsHidden = false;
  }
  shooping() {
    this.orderIsHidden = true;
    this.shoopingIsHidden = true;
  }
  deleteItem(cart) {
    this.item = cart['_id'];
    const item = this.item;
   return this._httpClient.post(`http://localhost:3000/api/deleteitem/` + item, 'sa')   
  }
  deleteAllItems() {
    var cartId = this._authService.cartId;
    return this._httpClient.post(`http://localhost:3000/api/deleteallitems/` + cartId, 'sa') 
  } 
 
  postOrder(ordervalue) {
    var cartId = this._authService.cartId;
    var userId = this._authService.userId;
    var orderInfo = ordervalue;
    var order = { userId, orderInfo }
    return this._httpClient.post(`http://localhost:3000/api/postorder/` + cartId, order)
  }
  
  deleteUserCart() {
    var cartId = this._authService.cartId;
    return this._httpClient.post(`http://localhost:3000/api/deleteusercart/` + cartId, 'sa'); 
  }
  
  getUserOrderedCart() {
    var userId = this._authService.userId;
    return this._httpClient.get(`http://localhost:3000/users/getuserorderedcart/` + userId);
  } 
  getAllProductsAndOrders() {
    
    return this._httpClient.get(`http://localhost:3000/api/getallproductsandorders/`);
  } 
  getUserCartProductsNameAndTotal() {
    var id = this._authService.cartId;
    return this._httpClient.get(`http://localhost:3000/api/usercartproducts/` + id );   
  }
 addNewProduct(newProduct) {
    return this._httpClient.post(`http://localhost:3000/api/addnewproduct/` ,newProduct); 
 }
 editProduct(editProduct1) {
  return this._httpClient.post(`http://localhost:3000/api/editproduct/` ,editProduct1); 
}
}

