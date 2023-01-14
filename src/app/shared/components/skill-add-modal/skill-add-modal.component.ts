import { Color } from '@angular-material-components/color-picker';
import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { PortfolioService } from 'src/app/services/portfolio.service';

@Component({
  selector: 'app-skill-add-modal',
  templateUrl: './skill-add-modal.component.html',
  styleUrls: ['./skill-add-modal.component.css']
})
export class SkillAddModalComponent implements OnInit {

  public color: ThemePalette = 'primary';
  public touchUi = false;
  colorCtr: any = new FormControl(new Color(255, 243, 0));

  userLogged!:string
  token!:string;

  profileForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    percentaje: new FormControl('', [Validators.required,Validators.pattern(/^-?(0|[1-9]\d*)?$/),Validators.maxLength(3),Validators.max(100)]),
    icon: new FormControl('', [Validators.required]),
    color: new FormControl({value:'',disabled:false})
    });

  constructor(private portfolioService:PortfolioService, private route:ActivatedRoute, private router:Router) { }

  ngOnInit() {
    this.userLogged=localStorage.getItem('user')!
    this.token=localStorage.getItem('AuthToken')!
  }

  onSubmit(){
    const title= this.profileForm.controls.title.value!
    const percentaje= Number(this.profileForm.controls.percentaje.value!)
    const icon= this.profileForm.controls.icon.value!
    const color= '#'+this.colorCtr.value.hex

    this.portfolioService.createSkill(title,percentaje,icon?.substring(10,icon.length-6),color,this.userLogged,{headers: {'Content-Type':'application/json','Authorization':`Bearer ${this.token}`}}).subscribe((skill)=>{
      this.portfolioService.setSkill(skill)
    })
    }

}
