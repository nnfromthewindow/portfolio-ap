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

  public color: ThemePalette = 'primary';
  public touchUi = false;
  colorParsed!:Color;
  colorCtr: any=new FormControl(new Color(255,50,50))

  jwtToken$ = this.store.select(fromAuth.selectToken);
  username!:string;
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
    color: new FormControl({value:'',disabled:false}, [Validators.required]),
    image: new FormControl(this.image, [Validators.required]),
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

    this.profileForm.controls.title.setValue(this.title)
    this.profileForm.controls.subtitle.setValue(this.subtitle)
    this.profileForm.controls.detail.setValue(this.detail)
    this.profileForm.controls.image.setValue(this.image)
   
    const col= new Color(this.hexToRgb(this.education.color)?._r!,this.hexToRgb(this.education.color)?._g!,this.hexToRgb(this.education.color)?._b!);
    this.colorCtr= new FormControl(col)

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
      
      this.title=title;
      this.subtitle=subtitle;
      this.detail=detail;
      this.image=image;
      
      this.portfolioService.editEducation(this.educationId,{title:this.title,subtitle:this.subtitle,detail:this.detail,color:'#'+this.colorCtr.value.hex,image:this.image},this.username,{headers: {'Content-Type':'application/json','Authorization':`Bearer ${token}`}}).subscribe(
        (education)=>{
          this.portfolioService.setEditEducation(education)
          this.router.navigateByUrl(this.username)
        }
      )
      }).unsubscribe()
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
