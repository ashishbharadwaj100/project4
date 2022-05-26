import { Component, OnInit, Inject,Injectable, Optional, Input,Output, EventEmitter} from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { MatDialogRef } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import { SerPro4Service } from '../../services/ser-pro4.service'
import { CartSideBarComponent } from '../cart-side-bar/cart-side-bar.component';

@Component({
  selector: 'app-product-quantity-modal',
  templateUrl: './product-quantity-modal.component.html',
  styleUrls: ['./product-quantity-modal.component.css']
})
export class ProductQuantityModalComponent implements OnInit {
 
  // @Output() public ng = new EventEmitter();
  fromPage:string;
  quantity = new FormControl('', [Validators.required]);
  productQunt;
  product;
  UserCart;
  constructor(public _ApiService: SerPro4Service, public dialogRef: MatDialogRef<ProductQuantityModalComponent>
      ,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.fromPage = data.pageValue;
    }

  ngOnInit() {
  }
  openDialog() { 
  }
  save() {
    // alert("save")
    this.dialogRef.close(this.quantity.value)
       var result = this.quantity.value;
    // console.log(result);
     var id = this.fromPage;
    console.log(id);
    this._ApiService.postSingleProduct(id, result).subscribe(data => {
      this.productQunt = data;
      
    })
   
      this._ApiService.getUserCart().subscribe(data => {
        this._ApiService.changeUserProduct(data)
        console.log(data);
       
      });
    
    
  }
  cancel() {
    this.dialogRef.close("it was canceld")
  }

  getErrorMessage() {
    return this.quantity.hasError('requierd') ? 'You must enter a value' :
      '';
  }
}
