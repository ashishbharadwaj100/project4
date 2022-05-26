import { Component, OnInit ,Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SerPro4Service } from '../../services/ser-pro4.service';
import { ProductQuantityModalComponent } from '../../components/product-quantity-modal/product-quantity-modal.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.css']
  
})
export class SingleProductComponent implements OnInit {
  allProductCatagory;
  productQunt;
  sendValue: string;
  dialogValue:string; 
  // searchProduct;
  
  searchProduct;
  constructor(public _ApiService: SerPro4Service, public dialog: MatDialog, public _authService: AuthService) { }
  
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
   
    // console.log(this._ApiService.name);
    const name = this._ApiService.name;
   
    this._ApiService.getProduct1(name).subscribe(data => {
    data = data['data'];
      console.log(data);
      
      this.searchProduct = data;
    
      
    }
    )
}
 
    
    
    
    

  
//     this._ApiService.getProduct(name).subscribe(data => {
//           this.searchProduct1 = data
//  console.log(this.searchProduct1);
//         }
//       )}

  
  
    // searchProduct(search) {
    //   // let name = search;
    //   this.searchProduct1 = search;
    //   this._ApiService.getProduct(this.searchProduct1).subscribe(data => {
    //     data;
    //      this.searchProduct1 = data;
        
    //   }
    //   ) 
    // }
    // openDialog() {
    //   let  dialogRef = this.dialog.open(ProductQuantityModalComponent, {
         
    //     });
    
    //     dialogRef.afterClosed().subscribe(result => {
    //       // console.log(product);
    //       // console.log(result);
    //       // var id = product;
    //       // this._ApiService.postSingleProduct(id , result).subscribe(data => {
    //       //   this.productQunt = data;
            
    //     // });
    //       })
           
    //   }
  }


