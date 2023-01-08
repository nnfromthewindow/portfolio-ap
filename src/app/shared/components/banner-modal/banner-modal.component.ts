import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromAuth from '../../../state/auth/auth.reducer'
import { PortfolioService } from 'src/app/services/portfolio.service';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';


@Component({
  selector: 'app-banner-modal',
  templateUrl: './banner-modal.component.html',
  styleUrls: ['./banner-modal.component.css']
})
export class BannerModalComponent implements OnInit {

jwtToken$ = this.store.select(fromAuth.selectToken);
username!:string;
bannerId!:any;
image!:any;


profileForm = new FormGroup({
  link: new FormControl('', [Validators.required])
  });

  constructor(private portfolioService:PortfolioService, private store: Store<fromAuth.State>, public dialogRef: MatDialogRef<BannerModalComponent>,private router:Router) { }


  ngOnInit() {
    var username= location.pathname.substring(1,location.pathname.length)
    this.portfolioService.getPortfolio(username).subscribe({next:(port:any)=>{
      this.bannerId=port[3].bannerImage
      this.image=this.bannerId[0].image
      this.bannerId=this.bannerId[0].id
    }})
  }

  onSubmit(){
    this.jwtToken$.subscribe((token:any)=>{

       var username:any= location.pathname.substring(1,location.pathname.length);
       this.image= this.profileForm.controls.link.value!;

      this.portfolioService.editBannerImage(this.bannerId,{image:this.image},username,{
        headers: {'Content-Type':'application/json','Authorization':`Bearer ${token}`}
     }).subscribe(
      (banner)=>{this.portfolioService.setBanner(banner)}
     );

  }).unsubscribe()
  }
}
