import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PortfolioService } from 'src/app/services/portfolio.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-banner-modal',
  templateUrl: './banner-modal.component.html',
  styleUrls: ['./banner-modal.component.css']
})
export class BannerModalComponent implements OnInit {

username!:string;
bannerId!:any;
image!:any;
userLogged!:string;
token!:string;

profileForm = new FormGroup({
  link: new FormControl('', [Validators.required])
  });

  constructor(private portfolioService:PortfolioService, public dialogRef: MatDialogRef<BannerModalComponent>) { }


  ngOnInit() {
    this.userLogged=localStorage.getItem('user')!
    this.token=localStorage.getItem('AuthToken')!

    this.portfolioService.getPortfolio(this.userLogged).subscribe({next:(port:any)=>{
      this.bannerId=port[3].bannerImage
      this.image=this.bannerId[0].image
      this.bannerId=this.bannerId[0].id
    }})
  }

  onSubmit(){
      this.image= this.profileForm.controls.link.value!;
      this.portfolioService.editBannerImage(this.bannerId,{image:this.image},this.userLogged,{
        headers: {'Content-Type':'application/json','Authorization':`Bearer ${this.token}`}
     }).subscribe(
      (banner)=>{this.portfolioService.setBanner(banner)}
     );

     }
}
