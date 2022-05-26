import { Component, OnInit, Inject,Injectable, Optional } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { MatDialogRef } from '@angular/material';

import { SerPro4Service } from '../../services/ser-pro4.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-orderconfirm',
  templateUrl: './orderconfirm.component.html',
  styleUrls: ['./orderconfirm.component.css']
})
export class OrderconfirmComponent implements OnInit {

  fromPage:string;
  constructor(public _ApiService: SerPro4Service, private _router: Router, public dialogRef: MatDialogRef<OrderconfirmComponent>
    ,
  @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  this.fromPage = data.pageValue;
  
  }
  save() {
    alert("save")
  }
  confirm() {
    this.dialogRef.close("it was canceld")
    this._router.navigate(['login'])  
  }
  ngOnInit() {
  }

}
