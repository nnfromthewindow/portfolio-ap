import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PortfolioService } from 'src/app/services/portfolio.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-avatar-modal',
  templateUrl: './avatar-modal.component.html',
  styleUrls: ['./avatar-modal.component.css']
})
export class AvatarModalComponent implements OnInit {
  
  username!:string;
  avatarId!:any;
  image!:any;
  userLogged!:any
  token!:string;

  profileForm = new FormGroup({
    link: new FormControl('', [Validators.required])
    });

    constructor(private portfolioService:PortfolioService, public dialogRef: MatDialogRef<AvatarModalComponent>) { }


    ngOnInit() {
      var username= location.pathname.substring(1,location.pathname.length)
      this.userLogged=localStorage.getItem('user')!
      this.token=localStorage.getItem('AuthToken')!
      this.portfolioService.getPortfolio(this.userLogged).subscribe({next:(port:any)=>{
        this.avatarId=port[2].avatarImage
        this.image=this.avatarId[0].image
        this.avatarId=this.avatarId[0].id

      }})
    }

    onSubmit(){
        
      this.image= this.profileForm.controls.link.value!;
      this.portfolioService.editAvatarImage(this.avatarId,{image:this.image},this.userLogged,{
          headers: {'Content-Type':'application/json','Authorization':`Bearer ${this.token}`}
       }).subscribe(
        (avatar)=>{this.portfolioService.setAvatar(avatar)}
       );
    }
}
