import { Component, OnInit } from '@angular/core';
import { SerPro4Service } from '../../services/ser-pro4.service';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  // allProducts;
  allProductCatagory;
  constructor(private _ApiService: SerPro4Service) { }

  ngOnInit() {
    // this._ApiService.getAllProducts().subscribe((data) => {
    //   console.log(data);
    //   this.allProducts = data;
      // })

  }
  product(name) {
      
    let id = name;
    this._ApiService.getSingleCatagory(id).subscribe(data => {
      this.allProductCatagory = data;
       
      });
  }
}