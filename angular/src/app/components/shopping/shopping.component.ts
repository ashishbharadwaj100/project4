import { Component, OnInit } from '@angular/core';
import { SerPro4Service } from '../../services/ser-pro4.service';
import { AuthService } from '../../services/auth.service';
import { MilknEggsComponent } from '../catagories/milkn-eggs/milkn-eggs.component'
import { VegetablesFruitsComponent } from '../catagories/vegetables-fruits/vegetables-fruits.component'
import { MeatFishComponent } from '../catagories/meat-fish/meat-fish.component';
import { WineDrinksComponent } from '../catagories/wine-drinks/wine-drinks.component';
import { SingleProductComponent } from '../single-product/single-product.component';

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.css']
})
export class ShoppingComponent implements OnInit {
  
  catagoryComponent = MilknEggsComponent;
  searchProduct1;
  
  constructor(public _ApiService: SerPro4Service, private _AuthService: AuthService) { }

  ngOnInit() {
}

  assignComponent(component) {
    if (component === 'vegetablesNfruits')
      this.catagoryComponent = VegetablesFruitsComponent;
    else if (component === 'meatNfish')
      this.catagoryComponent = MeatFishComponent;
    else if (component === 'milkNeggs')
      this.catagoryComponent = MilknEggsComponent;
    else
      this.catagoryComponent = WineDrinksComponent;
  }
  searchProduct(search) {
     let name = search;
       name = this._ApiService.getProduct(name); 
    this.catagoryComponent = SingleProductComponent;
 }
}
