import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromAuth from '../../../state/auth/auth.reducer'
import { PortfolioService } from 'src/app/services/portfolio.service';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-avatar-modal',
  templateUrl: './avatar-modal.component.html',
  styleUrls: ['./avatar-modal.component.css']
})
export class AvatarModalComponent implements OnInit {
  jwtToken$ = this.store.select(fromAuth.selectToken);
  username!:string;
  avatarId!:any;
  image!:any;


  profileForm = new FormGroup({
    link: new FormControl('', [Validators.required])
    });

    constructor(private portfolioService:PortfolioService, private store: Store<fromAuth.State>, public dialogRef: MatDialogRef<AvatarModalComponent>,private router:Router) { }


    ngOnInit() {
      var username= location.pathname.substring(1,location.pathname.length)
      this.portfolioService.getPortfolio(username).subscribe({next:(port:any)=>{
        this.avatarId=port[2].avatarImage
        this.image=this.avatarId[0].image
        this.avatarId=this.avatarId[0].id

      }})
    }

    onSubmit(){
      this.jwtToken$.subscribe((token:any)=>{

         var username:any= location.pathname.substring(1,location.pathname.length);
         this.image= this.profileForm.controls.link.value!;

        this.portfolioService.editAvatarImage(this.avatarId,{image:this.image},username,{
          headers: {'Content-Type':'application/json','Authorization':`Bearer ${token}`}
       }).subscribe(
        (avatar)=>{this.portfolioService.setAvatar(avatar)}
       );

    })
    }
}
