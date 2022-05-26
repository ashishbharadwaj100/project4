import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminSideBarComponent } from '../../components/admin-side-bar/admin-side-bar.component';
import { SerPro4Service } from '../../services/ser-pro4.service';

@Component({
  selector: 'app-admin-side-bar-add-product',
  templateUrl: './admin-side-bar-add-product.component.html',
  styleUrls: ['./admin-side-bar-add-product.component.css']
})
export class AdminSideBarAddProductComponent implements OnInit {
  submitted = false;
  newProductForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private _AdminSideBarComponent: AdminSideBarComponent,
    public _ApiService: SerPro4Service) { }

  ngOnInit() {
    this.newProductForm = this.formBuilder.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      catagory: ['', Validators.required],
   
    }, {
      // validator: MustMatch('password', 'confirmPassword')
    });
  }
  get f() { return this.newProductForm.controls; }
  cancel() {
    this._AdminSideBarComponent.newProduct = true;
  }
  onSubmit() {
    
    this.submitted = true;
    console.log(this.newProductForm);
    let newProduct = this.newProductForm.value
    this._ApiService.addNewProduct(newProduct).subscribe(data => {
      console.log(data);
   
    
    }
    )
  }
}
