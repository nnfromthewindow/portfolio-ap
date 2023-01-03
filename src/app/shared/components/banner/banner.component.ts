import { Component, OnInit } from '@angular/core';
import { UploadImageModalComponent } from '../upload-image-modal/upload-image-modal.component';
import {MatDialog} from '@angular/material/dialog';
import * as fromAuth from '../../../state/auth/auth.reducer'
import { Store } from '@ngrx/store';
import { PortfolioService } from 'src/app/services/portfolio.service';
@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {

  jwtToken$ = this.store.select(fromAuth.selectToken);
  //user$ = this.store.select(fromAuth.selectUser);
  bannerImage!:any[];

  constructor(public dialog: MatDialog,  private store: Store<fromAuth.State>, private portfolioService: PortfolioService) {}

  ngOnInit(): void {
    var username= location.pathname.substring(1,location.pathname.length)
    this.portfolioService.getPortfolio(username).subscribe({next:(port:any)=>{

if(port[3].bannerImage.length>0){
      this.bannerImage=Object.values(port[3])
      this.bannerImage=this.bannerImage[0]
      this.bannerImage=this.bannerImage[0].image
     // console.log(port)
}

    }})
  }


openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
  this.dialog.open(UploadImageModalComponent, {
    width: '250px',
    enterAnimationDuration,
    exitAnimationDuration,
  });
}
}
