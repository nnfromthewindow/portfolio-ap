import { Color } from '@angular-material-components/color-picker';
import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { PortfolioService } from 'src/app/services/portfolio.service';
import * as fromAuth from '../../../state/auth/auth.reducer'
@Component({
  selector: 'app-education-edit-modal',
  templateUrl: './education-edit-modal.component.html',
  styleUrls: ['./education-edit-modal.component.css']
})
export class EducationEditModalComponent implements OnInit {

  public disabled = false;
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
  education!:any;
  educationId!:string;
  title!:string;
  subtitle!:string;
  detail!:string;
  image!:string;

  profileForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    subtitle: new FormControl('', [Validators.required]),
    detail: new FormControl('', [Validators.required]),
    color: new FormControl("#"+this.colorCtr.value.hex, [Validators.required]),
    image: new FormControl('', [Validators.required]),
    });

  constructor(private portfolioService:PortfolioService, private store: Store<fromAuth.State>, private route:ActivatedRoute, private router:Router) { }

  ngOnInit() {
    this.username=this.route.snapshot.children[0].paramMap.get('username')!
    this.educationId=this.route.snapshot.children[0].paramMap.get('id')!
    
    this.portfolioService.getPortfolio(this.username).subscribe((port:any)=>{
    this.education= port[5].education.filter((ab:any)=>{return ab.id==this.educationId})
    this.education=this.education[0];
    this.title=this.education.title;
    this.subtitle=this.education.subtitle;
    this.detail=this.education.detail;
    this.image=this.education.image;
    //const color = this.education.color.substring(1,this.education.color.length)
   // this.profileForm.controls.color.value!=this.education.color
    //this.colorCtr.value.hex=color
    //console.log(this.colorCtr)
  })
   
  }

  onSubmit(){
    this.jwtToken$.subscribe((token:any)=>{
      const id = this.educationId
      const title= this.profileForm.controls.title.value!
      const subtitle= this.profileForm.controls.subtitle.value!
      const detail= this.profileForm.controls.detail.value!
      const color= '#'+this.colorCtr.value.hex
      const image= this.profileForm.controls.image.value!
      const username= this.username
      this.portfolioService.editEducation(id,title,subtitle,detail,color,image,username,{headers: {'Content-Type':'application/json','Authorization':`Bearer ${token}`}}).subscribe(
        (education:any)=>{
          this.portfolioService.setEditEducation(education)
          this.router.navigateByUrl(this.username)
        }
      )
    }).unsubscribe()
  }
}
