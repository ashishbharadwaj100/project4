import { Component, OnInit } from '@angular/core';
import { SerPro4Service } from '../../../services/ser-pro4.service';
import { AuthService } from '../../../services/auth.service'
import { ProductQuantityModalComponent } from '../../../components/product-quantity-modal/product-quantity-modal.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-wine-drinks',
  templateUrl: './wine-drinks.component.html',
  styleUrls: ['./wine-drinks.component.css']
})
export class WineDrinksComponent implements OnInit {
  allProductCatagory;
  productQunt;
  sendValue: string;
  dialogValue: string; 
  
  constructor(public _ApiService: SerPro4Service, public dialog: MatDialog,public _authService: AuthService) { }

  

  openDialog(product) {
     if (this._authService.isAdmin == true) {
       this._ApiService.changeProduct(product)
      } else {
      this.sendValue = product;
      console.log(this.sendValue);
      let dialogRef = this.dialog.open(ProductQuantityModalComponent, {
        data: { pageValue: this.sendValue }
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed', result);
        this.dialogValue = result.data;
      });
    }
  }

  ngOnInit() {
    let id = "5dd7fd95f78e6f2d70441893";
    this._ApiService.getSingleCatagory(id).subscribe(data => {
      this.allProductCatagory = data;
      // console.log(this.allProductCatagory);
      
      
       
    })
  }

}
