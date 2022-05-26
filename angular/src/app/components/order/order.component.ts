import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SerPro4Service } from '../../services/ser-pro4.service'
// import custom validator to validate that password and confirm password fields match
import { MustMatch } from '../../_helpers/must-match.validator';
import {MatSnackBar} from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { OrderconfirmComponent } from '../orderconfirm/orderconfirm.component';
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  productQunt;
  sendValue;
  constructor(public _ApiService: SerPro4Service, private formBuilder: FormBuilder, public dialog: MatDialog) { }
  ngOnInit() {
    this.registerForm = this.formBuilder.group({
        // title: ['', Validators.required],
        city: ['', Validators.required],
        street: ['', Validators.required],
        date: ['', [Validators.required]],
        creditcard: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]],
        
     
    }, {
        // validator: MustMatch
    });
}

// convenience getter for easy access to form fields
get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;
console.log(this.registerForm.invalid);
    if (this.registerForm.invalid === false) {
      let ordervalue = this.registerForm.value;
      console.log(ordervalue);
        this._ApiService.postOrder(ordervalue).subscribe(data => {
          data;
          }
        )
     ;
    
    }
     this.on()
    this._ApiService.deleteUserCart().subscribe(data => {
      console.log(data);
      data;
    });
    this._ApiService.deleteAllItems().subscribe(data => {
      console.log(data);
      data;
    });
      
    
  }; 
  on() {
    // this.sendValue = product;
    // console.log(this.sendValue);
    this._ApiService.getUserCartProductsNameAndTotal().subscribe(data => {
      console.log(data);
 
      this.sendValue = data
    })
    let  dialogRef = this.dialog.open(OrderconfirmComponent , {
    data: {pageValue: this.sendValue}
   });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed',result);
      // this.dialogValue = result.data;
    });
  }
    }
  




