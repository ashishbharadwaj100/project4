import { Component, OnInit,Injectable } from '@angular/core';
import { SerPro4Service } from '../../services/ser-pro4.service';
import { ResizeEvent } from 'angular-resizable-element';
import { ShoppingComponent } from '../../components/shopping/shopping.component';

@Component({
  selector: 'app-cart-side-bar',
  templateUrl: './cart-side-bar.component.html',
  styleUrls: ['./cart-side-bar.component.css'],
  

})
@Injectable()
export class CartSideBarComponent implements OnInit {
  catagoryComponent = ShoppingComponent
  // UserCart = this._ApiService.cartItems;
  TotalPrice;
  cart;
  userCart;
  UserCart;
  userProductData;
  constructor(private _ApiService: SerPro4Service) { }
 
  public style: object = {};

  validate(event: ResizeEvent): boolean {
    const MIN_DIMENSIONS_PX: number = 50;
    if (
      event.rectangle.width &&
      event.rectangle.height &&
      (event.rectangle.width < MIN_DIMENSIONS_PX ||
        event.rectangle.height < MIN_DIMENSIONS_PX)
    ) {
      return false;
    }
    return true;
  }

  onResizeEnd(event: ResizeEvent): void {
    this.style = {
      position: 'fixed',
      left: `${event.rectangle.left}px`,
      top: `${event.rectangle.top}px`,
      width: `${event.rectangle.width}px`,
      height: `${event.rectangle.height}px`
    };
  }
 
  order() {
   if (this.UserCart.length > 0) {
      this._ApiService.order();
    } else {
     alert('Your Shooping Cart Is Empty!')
   }
  }

  shooping() {
    this._ApiService.shooping();
  }
  
  deleteItem(cart) {
     this._ApiService.deleteItem(cart).subscribe(data => {
      data;
    });
     this.ngOnInit() 
  };

  deleteAllItems() {
    this._ApiService.deleteAllItems().subscribe(data => {
      data;
    })
    this.ngOnInit() 
  }

  ngOnInit() {

    this._ApiService.currentUserProduct.subscribe(currentUserProduct => {
     if (currentUserProduct = 'b') {
         this._ApiService.getUserCart().subscribe(data => {
           this.UserCart = data['data']
           this.TotalPrice = data['total']
           
       })
      }}
    )
  }
  }

  