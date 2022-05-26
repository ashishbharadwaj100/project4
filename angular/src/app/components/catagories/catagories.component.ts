import { Component, OnInit } from '@angular/core';
import { SerPro4Service } from '../../services/ser-pro4.service';
import { MilknEggsComponent } from './milkn-eggs/milkn-eggs.component';

import { ProductsComponent } from '../products/products.component';
@Component({
  selector: 'app-catagories',
  templateUrl: './catagories.component.html',
  styleUrls: ['./catagories.component.css']
})
export class CatagoriesComponent implements OnInit {
  allCatagories;
  allProducts;
  allProductCatagory;


  constructor(private _ApiService: SerPro4Service) { }

  ngOnInit() {
    this._ApiService.getAllCatagories().subscribe((data) => {
      this.allCatagories = data;
      })
    this._ApiService.getAllProducts().subscribe((data1) => {
      this.allProducts = data1;
     })
  }
}