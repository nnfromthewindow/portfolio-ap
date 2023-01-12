import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import * as fromAuth from '../../../state/auth/auth.reducer'
import { Store } from '@ngrx/store';
import { PortfolioService } from 'src/app/services/portfolio.service';
import { BannerModalComponent } from '../banner-modal/banner-modal.component';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {

  jwtToken$ = this.store.select(fromAuth.selectToken);
  //user$ = this.store.select(fromAuth.selectUser);
  bannerImage!:any[];
  public bannerSubscription!: Subscription;
  constructor(public dialog: MatDialog,  private store: Store<fromAuth.State>, private portfolioService: PortfolioService, public authService:AuthService) {}

  ngOnInit(): void {
    var username= location.pathname.substring(1,location.pathname.length)
    this.portfolioService.getPortfolio(username).subscribe({next:(port:any)=>{
   
    if(port[3].bannerImage.length>0){
      this.bannerImage=Object.values(port[3])
      this.bannerImage=this.bannerImage[0]
      this.bannerImage=this.bannerImage[0].image

    this.bannerSubscription = this.portfolioService.getBanner().subscribe((resp:any)=>{this.bannerImage=resp.image})
}

    }})
  }


openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
  this.dialog.open(BannerModalComponent, {
    width: '250px',
    enterAnimationDuration,
    exitAnimationDuration,
  });
}
}
