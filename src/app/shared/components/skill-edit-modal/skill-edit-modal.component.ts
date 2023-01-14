import { Color } from '@angular-material-components/color-picker';
import { Component, OnInit  } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';
import { PortfolioService } from 'src/app/services/portfolio.service';


@Component({
  selector: 'app-skill-edit-modal',
  templateUrl: './skill-edit-modal.component.html',
  styleUrls: ['./skill-edit-modal.component.css']
})
export class SkillEditModalComponent implements OnInit {

  public color: ThemePalette = 'primary';
  public touchUi = false;
  colorCtr: any = new FormControl(new Color(255, 243, 0));

  userLogged!:string
  token!:string;

  skills!:any;
  skillId!:string;
  title!:string;
  percentaje!:number;
  icon!:string;


  profileForm = new FormGroup({
    title: new FormControl(this.title, [Validators.required]),
    percentaje: new FormControl(this.percentaje, [Validators.required,Validators.pattern(/^-?(0|[1-9]\d*)?$/),Validators.maxLength(3),Validators.max(100)]),
    icon: new FormControl(this.icon, [Validators.required]),
    color: new FormControl({value:'',disabled:false})
    });

  constructor(private portfolioService:PortfolioService, private router:Router, private authService:AuthService) { }

  ngOnInit() {
    this.userLogged=localStorage.getItem('user')!
    this.token=localStorage.getItem('AuthToken')!
    this.authService.editId$.subscribe((res)=>this.skillId=res)
    this.portfolioService.getPortfolio(this.userLogged).subscribe((port:any)=>{

      this.skills= port[7].skills.filter((sk:any)=>{return sk.id==this.skillId})
      this.skills=this.skills[0];

      this.title=this.skills.title;
      this.percentaje=this.skills.percentaje;
      this.icon="<i class='"+this.skills.icon+"'></i>";


      this.profileForm.controls.title.setValue(this.title)
      this.profileForm.controls.percentaje.setValue(this.percentaje)
      this.profileForm.controls.icon.setValue(this.icon)


      const col= new Color(this.hexToRgb(this.skills.color)?._r!,this.hexToRgb(this.skills.color)?._g!,this.hexToRgb(this.skills.color)?._b!);
      this.colorCtr= new FormControl(col)

    })
  }

  onSubmit(){
      const title= this.profileForm.controls.title.value!
      const percentaje= Number(this.profileForm.controls.percentaje.value!)
      const icon= this.profileForm.controls.icon.value!

      this.title=title;
      this.percentaje=percentaje;
      this.icon=icon;

      this.portfolioService.editSkill(this.skillId,{title:this.title,percentaje:this.percentaje,icon:icon?.substring(10,icon.length-6),color:'#'+this.colorCtr.value.hex},this.userLogged,{headers: {'Content-Type':'application/json','Authorization':`Bearer ${this.token}`}}).subscribe(
        (skill)=>{
          this.portfolioService.setEditSkill(skill)
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
