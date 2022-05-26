import { Component, OnInit } from '@angular/core';
import { SerPro4Service } from '../../services/ser-pro4.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-admin-side-bar',
  templateUrl: './admin-side-bar.component.html',
  styleUrls: ['./admin-side-bar.component.css']
})
export class AdminSideBarComponent implements OnInit {

  adminProductData;
  catagory;
  catagoryList;
  newProduct: boolean = true;
  submitted = false;
  editProductForm: FormGroup;
  constructor(public _ApiService: SerPro4Service, private formBuilder: FormBuilder) { }
  
  ngOnInit() {
    this._ApiService.currentProduct.subscribe(adminProductData => {
      this.adminProductData = adminProductData
      console.log(this.adminProductData);
      
      this.catagory = adminProductData[Object.keys(adminProductData)[3]];
      if (this.catagory == undefined) {
        return;
      } else {
        this.catagory = this.catagory[Object.keys(this.catagory)[0]];
        console.log(this.catagory);
        
     
      }
    })
    this.catagoryList = [
      { id: "5dd7fd8bf78e6f2d70441892", name: "Meat & Fish" },
      { id: "5dcffe2ac453ef3f1c174ee9" ,name: "Milk & Eggs" },
      { id: "5dd7fd5af78e6f2d70441891"  ,name: "Vegetables & Fruits" },
      { id: "5dd7fd95f78e6f2d70441893", name: "Wine & Drinks" }
    ]
    this.catagory = "5dd7fd95f78e6f2d70441893";
    
    this.editProductForm = this.formBuilder.group({
     name: ['' ,Validators.required],
     price: ['', Validators.required],
     catagory: ['', Validators.required],
  
   }, {
   
   });
  
  }
  get f() { return this.editProductForm.controls; }
  
  addProduct() {
    this.newProduct = false;
    
    // alert('d');
  }
  cancel() {
    this.newProduct = true;
  }
  onSubmit() {
    this.submitted = true;
    if (this.editProductForm.invalid) {
      return;
    } else {
      let oldProduct = this.adminProductData[Object.keys(this.adminProductData)[0]]
      let newProduct = this.editProductForm.value;
      console.log(oldProduct, newProduct);
      let editProduct1 = {oldProduct , newProduct }
      
      this._ApiService.editProduct(editProduct1).subscribe(data => {
        data;
        console.log(data);
     
      
      }
      )
  }
   
     
  }
}
