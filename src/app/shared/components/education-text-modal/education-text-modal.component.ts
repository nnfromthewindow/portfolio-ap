import { Color } from '@angular-material-components/color-picker';
import { Component, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { PortfolioService } from 'src/app/services/portfolio.service';

@Component({
  selector: 'app-education-text-modal',
  templateUrl: './education-text-modal.component.html',
  styleUrls: ['./education-text-modal.component.css']
})
export class EducationTextModalComponent implements OnInit {
  
 
  public color: ThemePalette = 'primary';
  public touchUi = false;
  colorCtr: any = new FormControl(new Color(255, 243, 0));
  public selectedFile:any;
  public event1:any;
  imgURL: any;
  receivedImageData: any;
  base64Data: any;
  convertedImage: any;

  userLogged!:string
  token!:string;
    
  profileForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    subtitle: new FormControl('', [Validators.required]),
    detail: new FormControl('', [Validators.required]),
    color: new FormControl({value:'',disabled:false}),
    image: new FormControl('', [Validators.required]),
    });

  constructor(private portfolioService:PortfolioService) { }

  ngOnInit() {
    this.userLogged=localStorage.getItem('user')!
    this.token=localStorage.getItem('AuthToken')!
   
  }
  
 onSubmit(){

  const title= this.profileForm.controls.title.value!
  const subtitle= this.profileForm.controls.subtitle.value!
  const detail= this.profileForm.controls.detail.value!
  const color= '#'+this.colorCtr.value.hex
  const image= this.profileForm.controls.image.value!
 
  this.portfolioService.createEducation(title,subtitle,detail,color,image,this.userLogged,{headers: {'Content-Type':'application/json','Authorization':`Bearer ${this.token}`}}).subscribe((education)=>{
    this.portfolioService.setEducation(education)
  })
}
 
}
