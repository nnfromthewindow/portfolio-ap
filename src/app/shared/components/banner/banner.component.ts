import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { PortfolioService } from 'src/app/services/portfolio.service';
import { BannerModalComponent } from '../banner-modal/banner-modal.component';
import { filter, Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, NavigationEnd, Router, RouterState } from '@angular/router';
@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {

  bannerImage!:any[];
  public bannerSubscription!: Subscription;
  public portfolioSubscription!: Subscription;
  constructor(public dialog: MatDialog, private portfolioService: PortfolioService, public authService:AuthService, private route:ActivatedRoute, private router:Router) {}

  ngOnInit(): void {
   
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event:any)=>{
      var username=this.route.snapshot.children[0].paramMap.get('username')!
      this.portfolioService.getPortfolio(username).subscribe({next:(port:any)=>{
   
        if(port[3].bannerImage.length>0){
          this.bannerImage=Object.values(port[3])
          this.bannerImage=this.bannerImage[0]
          this.bannerImage=this.bannerImage[0].image
    
        this.bannerSubscription = this.portfolioService.getBanner().subscribe((resp:any)=>{this.bannerImage=resp.image})
    }
    
        }})

    })
  }

openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
  this.dialog.open(BannerModalComponent, {
    width: '250px',
    enterAnimationDuration,
    exitAnimationDuration,
  });
}
}
