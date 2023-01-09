import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  username!:any;
  profileForm = new FormGroup({
    message: new FormControl(this.aboutme, [Validators.required])
    });


  constructor(private _ngZone: NgZone, private portfolioService:PortfolioService, private store: Store<fromAuth.State>, private route:ActivatedRoute, private router:Router) {}

  @ViewChild('autosize') autosize!: CdkTextareaAutosize;

  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this._ngZone.onStable.pipe(take(1)).subscribe(() => this.autosize.resizeToFitContent(true));
  }

  ngOnInit() {
    this.aboutmeId=this.route.snapshot.children[0].paramMap.get('id')
    this.username=this.route.snapshot.children[0].paramMap.get('username')
    this.portfolioService.getPortfolio(this.username).subscribe((port:any)=>{
    this.aboutme= port[4].aboutme.filter((ab:any)=>ab.id==this.aboutmeId)[0].message
    })
    }

  onSubmit(){
    this.jwtToken$.subscribe((token:any)=>{
     this.portfolioService.editAboutme(this.aboutmeId,{message:this.profileForm.controls.message.value},this.username,{
       headers: {'Content-Type':'application/json','Authorization':`Bearer ${token}`}
    }).subscribe(
     (about)=>{
      this.portfolioService.setAboutme(about)
      this.router.navigateByUrl(this.username)
    }
    );
    }).unsubscribe()
  }
}
