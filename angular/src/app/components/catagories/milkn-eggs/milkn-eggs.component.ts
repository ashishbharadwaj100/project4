import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SerPro4Service } from '../../../services/ser-pro4.service';
import { ProductQuantityModalComponent } from '../../../components/product-quantity-modal/product-quantity-modal.component';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-milkn-eggs',
  templateUrl: './milkn-eggs.component.html',
  styleUrls: ['./milkn-eggs.component.css']
})
export class MilknEggsComponent implements OnInit {
  allProductCatagory;
  productQunt;
  sendValue: string;
  dialogValue:string;  
  constructor(public _ApiService: SerPro4Service, public dialog: MatDialog,public _authService: AuthService) { }

  
  openDialog(product) {
    this.sendValue = product;
    if (this._authService.isAdmin == true) {
      this._ApiService.changeProduct(product)
    } else {
    
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
      let id = "5dcffe2ac453ef3f1c174ee9";
      this._ApiService.getSingleCatagory(id).subscribe(data => {
        console.log(data);
      
        this.allProductCatagory = data;
      });
   
    
  }
}
  

