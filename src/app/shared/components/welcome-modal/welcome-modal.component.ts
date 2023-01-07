import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import {  take } from 'rxjs';
import { PortfolioService } from 'src/app/services/portfolio.service';
import * as fromAuth from '../../../state/auth/auth.reducer'

@Component({
  selector: 'app-welcome-modal',
  templateUrl: './welcome-modal.component.html',
  styleUrls: ['./welcome-modal.component.css']
})
export class WelcomeModalComponent implements OnInit {
  jwtToken$ = this.store.select(fromAuth.selectToken);
  welcome!:any;
  welcomeId!:any;
  profileForm = new FormGroup({
    message: new FormControl(this.welcome, [Validators.required])
    });



  constructor(private _ngZone: NgZone, private portfolioService:PortfolioService, private store: Store<fromAuth.State>) {}

  @ViewChild('autosize') autosize!: CdkTextareaAutosize;

  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this._ngZone.onStable.pipe(take(1)).subscribe(() => this.autosize.resizeToFitContent(true));
  }

  ngOnInit() {
    var username= location.pathname.substring(1,location.pathname.length)
    this.portfolioService.getPortfolio(username).subscribe({next:(port:any)=>{
    this.welcomeId=port[1].welcome
    this.welcome=this.welcomeId[0].message
    this.welcomeId=this.welcomeId[0].id
    }})
  }

  onSubmit(){
    this.jwtToken$.subscribe((token:any)=>{
      var username:any= location.pathname.substring(1,location.pathname.length);
      this.welcome= this.profileForm.controls.message.value!;
     this.portfolioService.editWelcome(this.welcomeId,{message:this.welcome},username,{
       headers: {'Content-Type':'application/json','Authorization':`Bearer ${token}`}
    }).subscribe(
     (welcome)=>{this.portfolioService.setWelcome(welcome)}
    );
 })
  }
}
