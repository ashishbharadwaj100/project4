import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';



import { MatDialogModule, MatButtonModule, MatTableModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from '../app.component';
import { ShoppingComponent } from '../components/shopping/shopping.component';
import { LoginComponent } from '../components/login/login.component';
import { RegisterComponent } from '../components/register/register.component';
import { OrderComponent } from '../components/order/order.component';
import { CatagoriesComponent } from '../components/catagories/catagories.component';

import { ProductsComponent } from '../components/products/products.component';
import { MilknEggsComponent } from '../components/catagories/milkn-eggs/milkn-eggs.component';
import { VegetablesFruitsComponent } from '../components/catagories/vegetables-fruits/vegetables-fruits.component';
import { MeatFishComponent } from '../components/catagories/meat-fish/meat-fish.component';
import { WineDrinksComponent } from '../components/catagories/wine-drinks/wine-drinks.component';
import { ProductQuantityModalComponent } from '../components/product-quantity-modal/product-quantity-modal.component';

import { NavComponent } from '../components/nav/nav.component';

import { AuthGuard } from '../guards/auth.guard'


const routes: Routes = [
  {
    path: 'shopping', component: ShoppingComponent,
canActivate: [AuthGuard]  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'order', component: OrderComponent },
  { path: 'catagories', component: CatagoriesComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'milkneggs', component: MilknEggsComponent },
  // { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule ]
})
export class AppRoutingModule { }
