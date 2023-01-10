import { Color } from '@angular-material-components/color-picker';
import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { PortfolioService } from 'src/app/services/portfolio.service';
import * as fromAuth from '../../../state/auth/auth.reducer'
@Component({
  selector: 'app-experience-add-modal',
  templateUrl: './experience-add-modal.component.html',
  styleUrls: ['./experience-add-modal.component.css']
})
export class ExperienceAddModalComponent implements OnInit {
 
  public color: ThemePalette = 'primary';
  public touchUi = false;
  colorCtr: any = new FormControl(new Color(255, 243, 0));
  public selectedFile:any;
  public event1:any;
  imgURL: any;
  receivedImageData: any;
  base64Data: any;
  convertedImage: any;
  
  jwtToken$ = this.store.select(fromAuth.selectToken);
  username!:string;
  
  profileForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    subtitle: new FormControl('', [Validators.required]),
    detail: new FormControl('', [Validators.required]),
    color: new FormControl({value:'',disabled:false}, [Validators.required]),
    image: new FormControl('', [Validators.required]),
    });

  constructor(private portfolioService:PortfolioService, private store: Store<fromAuth.State>, private route:ActivatedRoute, private router:Router) { }

  ngOnInit() {
    this.username=this.route.snapshot.children[0].paramMap.get('username')!
   
  }
  


 onSubmit(){
  this.jwtToken$.subscribe((token:any)=>{
  
  const title= this.profileForm.controls.title.value!
  const subtitle= this.profileForm.controls.subtitle.value!
  const detail= this.profileForm.controls.detail.value!
  const color= '#'+this.colorCtr.value.hex
  const image= this.profileForm.controls.image.value!
 
  this.portfolioService.createExperience(title,subtitle,detail,color,image,this.username,{headers: {'Content-Type':'application/json','Authorization':`Bearer ${token}`}}).subscribe((experience)=>{
    this.portfolioService.setExperience(experience)
  })
 })
 
  }
}
