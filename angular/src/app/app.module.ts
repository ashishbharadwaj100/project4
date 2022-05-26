import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './modules/app-routing.module'
import { RouterModule, Routes } from '@angular/router';

import { MatDialogModule, MatButtonModule, MatTableModule, MatFormField, MatInputModule,MatFormFieldModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule, }   from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { ShoppingComponent } from './components/shopping/shopping.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { OrderComponent } from './components/order/order.component';
import { CatagoriesComponent } from './components/catagories/catagories.component';

import { ProductsComponent } from './components/products/products.component';
import { MilknEggsComponent } from './components/catagories/milkn-eggs/milkn-eggs.component';
import { VegetablesFruitsComponent } from './components/catagories/vegetables-fruits/vegetables-fruits.component';
import { MeatFishComponent } from './components/catagories/meat-fish/meat-fish.component';
import { WineDrinksComponent } from './components/catagories/wine-drinks/wine-drinks.component';
import { ProductQuantityModalComponent } from './components/product-quantity-modal/product-quantity-modal.component';
import { SerPro4Service } from './services/ser-pro4.service';
import { NavComponent } from './components/nav/nav.component';

import { AuthGuard } from './guards/auth.guard'
import { AuthService } from './services/auth.service';
import { CartSideBarComponent } from './components/cart-side-bar/cart-side-bar.component';
import { ResizableModule } from 'angular-resizable-element';
import { SingleProductComponent } from './components/single-product/single-product.component';

import { OrderconfirmComponent } from './components/orderconfirm/orderconfirm.component';
import { AdminSideBarComponent } from './components/admin-side-bar/admin-side-bar.component';
import { AdminSideBarAddProductComponent } from './components/admin-side-bar-add-product/admin-side-bar-add-product.component';
const appRoutes: Routes = [
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
  declarations: [
    AppComponent,
    ShoppingComponent,
    LoginComponent,
    RegisterComponent,
    OrderComponent,
    CatagoriesComponent,
    ProductsComponent,
    MilknEggsComponent,
    VegetablesFruitsComponent,
    MeatFishComponent,
    WineDrinksComponent,
    ProductQuantityModalComponent,
    NavComponent,
    CartSideBarComponent,
    SingleProductComponent,
    
    OrderconfirmComponent,
     AdminSideBarComponent,
     AdminSideBarAddProductComponent
    
    
  ],
  imports: [
    BrowserModule,
    ResizableModule,
  
    RouterModule.forRoot(
      appRoutes,
      
      { enableTracing: true }// <-- debugging purposes only
      
    ),
 
    AppRoutingModule, 
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatTableModule,
    MatDialogModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
  ],
  entryComponents: [VegetablesFruitsComponent, MilknEggsComponent,
    MeatFishComponent, WineDrinksComponent, ProductQuantityModalComponent,
      ProductQuantityModalComponent, SingleProductComponent,OrderconfirmComponent ],
  providers: [SerPro4Service , AuthService ,AuthGuard,CartSideBarComponent,OrderconfirmComponent,AdminSideBarComponent ],
  bootstrap: [AppComponent]
})
export class AppModule { }
