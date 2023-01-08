import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import {  take } from 'rxjs';
import { PortfolioService } from 'src/app/services/portfolio.service';
import * as fromAuth from '../../../state/auth/auth.reducer'

@Component({
  selector: 'app-aboutme-text-modal',
  templateUrl: './aboutme-text-modal.component.html',
  styleUrls: ['./aboutme-text-modal.component.css']
})
export class AboutmeTextModalComponent implements OnInit {

  jwtToken$ = this.store.select(fromAuth.selectToken);
  aboutme!:any;
  aboutmeId!:any;
  profileForm = new FormGroup({
    message: new FormControl(this.aboutme, [Validators.required])
    });


  constructor(private _ngZone: NgZone, private portfolioService:PortfolioService, private store: Store<fromAuth.State>, private route:ActivatedRoute) {}

  @ViewChild('autosize') autosize!: CdkTextareaAutosize;

  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this._ngZone.onStable.pipe(take(1)).subscribe(() => this.autosize.resizeToFitContent(true));
  }

  ngOnInit() {
    this.route.paramMap.subscribe((param)=>{
      this.aboutmeId=param.get('id')
    })
    console.log(this.aboutmeId)
  //console.log(this.route.snapshot.paramMap.get('id'))
  //var id = this.route.snapshot.paramMap.get('id')
  //console.log(this.route)
    /*this.portfolioService.getAboutme().subscribe((ab:any)=>{
    console.log(ab)
    this.aboutme=ab.message;
    this.aboutmeId=ab.id
    })
  /*  var username= location.pathname.substring(1,location.pathname.length)
    this.portfolioService.getPortfolio(username).subscribe({next:(port:any)=>{
      this.aboutme=port[4].aboutme
     
     // this.aboutme=port[4].aboutme[0].message
     // this.aboutmeId=port[4].aboutme[0].id
    
     
    }}).unsubscribe()
  */
 
    }
   /* getId(): void {
      const id = String(this.route.snapshot.paramMap.get('id'));
     console.log(id)
    }
*/
  onSubmit(){
    this.jwtToken$.subscribe((token:any)=>{
      
      var username:any= location.pathname.substring(1,location.pathname.length);
      //this.aboutme= this.profileForm.controls.message.value!;
    //  console.log(this.route.snapshot.paramMap.get('id'))
     this.portfolioService.editAboutme(this.aboutmeId,{message:this.aboutme},username,{
       headers: {'Content-Type':'application/json','Authorization':`Bearer ${token}`}
    }).subscribe(
     (about)=>{
      //console.log(this.aboutme)
      this.portfolioService.setAboutme(about)}
    );
    }).unsubscribe()
  }
}
