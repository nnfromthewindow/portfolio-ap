import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {  take } from 'rxjs';
import { PortfolioService } from 'src/app/services/portfolio.service';


@Component({
  selector: 'app-aboutme-add-text-modal',
  templateUrl: './aboutme-add-text-modal.component.html',
  styleUrls: ['./aboutme-add-text-modal.component.css']
})
export class AboutmeAddTextModalComponent implements OnInit {

  aboutme!:any;
  aboutmeId!:any;
  userLogged!:string
  token!:string;

  profileForm = new FormGroup({
    message: new FormControl(this.aboutme, [Validators.required])
    });


  constructor(private _ngZone: NgZone, private portfolioService:PortfolioService, private route:ActivatedRoute, private router:Router) {}

  @ViewChild('autosize') autosize!: CdkTextareaAutosize;

  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this._ngZone.onStable.pipe(take(1)).subscribe(() => this.autosize.resizeToFitContent(true));
  }

  ngOnInit() {
    this.userLogged=localStorage.getItem('user')!
    this.token=localStorage.getItem('AuthToken')!
   
   }

  onSubmit(){
      this.portfolioService.createAboutme(this.profileForm.controls.message.value,this.userLogged,{headers: {'Content-Type':'application/json','Authorization':`Bearer ${this.token}`}}).subscribe(
        (about:any)=>{
         this.portfolioService.setAddAboutme(about)
       }
       )
  }
  
}
