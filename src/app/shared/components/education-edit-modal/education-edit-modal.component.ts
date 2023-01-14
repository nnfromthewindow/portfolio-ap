import { Color } from '@angular-material-components/color-picker';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { PortfolioService } from 'src/app/services/portfolio.service';


@Component({
  selector: 'app-education-edit-modal',
  templateUrl: './education-edit-modal.component.html',
  styleUrls: ['./education-edit-modal.component.css']
})
export class EducationEditModalComponent implements OnInit {

  public color: ThemePalette = 'primary';
  public touchUi = false;
  colorParsed!:Color;
  colorCtr: any=new FormControl(new Color(255,50,50))

  userLogged!:string
  token!:string;

  education!:any;
  educationId!:string;
  title!:string;
  subtitle!:string;
  detail!:string;
  image!:string;

  profileForm = new FormGroup({
    title: new FormControl(this.title, [Validators.required]),
    subtitle: new FormControl(this.subtitle, [Validators.required]),
    detail: new FormControl(this.detail, [Validators.required]),
    color: new FormControl({value:'',disabled:false}),
    image: new FormControl(this.image, [Validators.required]),
    });
  
  constructor(private portfolioService:PortfolioService,private router:Router, private authService:AuthService,private route:ActivatedRoute) { }

  ngOnInit() {
    this.userLogged=localStorage.getItem('user')!
    this.token=localStorage.getItem('AuthToken')!
    this.authService.editId$.subscribe((res)=>this.educationId=res)
    
    this.portfolioService.getPortfolio(this.userLogged).subscribe((port:any)=>{
    this.education= port[5].education.filter((ab:any)=>{return ab.id==this.educationId})
    this.education=this.education[0];
    this.title=this.education.title;
    this.subtitle=this.education.subtitle;
    this.detail=this.education.detail;
    this.image=this.education.image;

    this.profileForm.controls.title.setValue(this.title)
    this.profileForm.controls.subtitle.setValue(this.subtitle)
    this.profileForm.controls.detail.setValue(this.detail)
    this.profileForm.controls.image.setValue(this.image)
   
    const col= new Color(this.hexToRgb(this.education.color)?._r!,this.hexToRgb(this.education.color)?._g!,this.hexToRgb(this.education.color)?._b!);
    this.colorCtr= new FormControl(col)

  })

  }

  onSubmit(){
      const title= this.profileForm.controls.title.value!
      const subtitle= this.profileForm.controls.subtitle.value!
      const detail= this.profileForm.controls.detail.value!
      const image= this.profileForm.controls.image.value!
      
      this.title=title;
      this.subtitle=subtitle;
      this.detail=detail;
      this.image=image;
      
      this.portfolioService.editEducation(this.educationId,{title:this.title,subtitle:this.subtitle,detail:this.detail,color:'#'+this.colorCtr.value.hex,image:this.image},this.userLogged,{headers: {'Content-Type':'application/json','Authorization':`Bearer ${this.token}`}}).subscribe(
        (education)=>{
          this.portfolioService.setEditEducation(education)
          this.router.navigateByUrl(this.userLogged)
        }
      )
      
  }

   hexToRgb(hex:string) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      _r: parseInt(result[1], 16),
      _g: parseInt(result[2], 16),
      _b: parseInt(result[3], 16)
    } : null;
  }
}
