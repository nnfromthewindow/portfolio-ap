import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {  take } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { PortfolioService } from 'src/app/services/portfolio.service';

@Component({
  selector: 'app-aboutme-text-modal',
  templateUrl: './aboutme-text-modal.component.html',
  styleUrls: ['./aboutme-text-modal.component.css']
})
export class AboutmeTextModalComponent implements OnInit {

  aboutme!:any;
  aboutmeId!:any;
  username!:any;
  userLogged!:string
  token!:string;

  profileForm = new FormGroup({
    message: new FormControl(this.aboutme, [Validators.required])
    });


  constructor(private _ngZone: NgZone, private portfolioService:PortfolioService, private route:ActivatedRoute, private router:Router, private authService:AuthService) {}

  @ViewChild('autosize') autosize!: CdkTextareaAutosize;

  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this._ngZone.onStable.pipe(take(1)).subscribe(() => this.autosize.resizeToFitContent(true));
  }

  ngOnInit() {
    this.userLogged=localStorage.getItem('user')!
    this.token=localStorage.getItem('AuthToken')!
    this.authService.editId$.subscribe((res)=>this.aboutmeId=res)
    this.portfolioService.getPortfolio(this.userLogged).subscribe((port:any)=>{
    this.aboutme= port[4].aboutme.filter((ab:any)=>ab.id==this.aboutmeId)[0].message
    })
    }

  onSubmit(){
     this.portfolioService.editAboutme(this.aboutmeId,{message:this.profileForm.controls.message.value},this.userLogged,{
       headers: {'Content-Type':'application/json','Authorization':`Bearer ${this.token}`}
    }).subscribe(
     (about)=>{
      this.portfolioService.setAboutme(about)
      this.router.navigateByUrl(this.userLogged)
    }
    );
  }
}
