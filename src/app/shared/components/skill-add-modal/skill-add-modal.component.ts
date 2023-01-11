import { Color } from '@angular-material-components/color-picker';
import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { PortfolioService } from 'src/app/services/portfolio.service';
import * as fromAuth from '../../../state/auth/auth.reducer'

@Component({
  selector: 'app-skill-add-modal',
  templateUrl: './skill-add-modal.component.html',
  styleUrls: ['./skill-add-modal.component.css']
})
export class SkillAddModalComponent implements OnInit {

  public color: ThemePalette = 'primary';
  public touchUi = false;
  colorCtr: any = new FormControl(new Color(255, 243, 0));

  jwtToken$ = this.store.select(fromAuth.selectToken);
  username!:string;

  profileForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    percentaje: new FormControl('', [Validators.required]),
    icon: new FormControl('', [Validators.required]),
    color: new FormControl({value:'',disabled:false}, [Validators.required])
    });

  constructor(private portfolioService:PortfolioService, private store: Store<fromAuth.State>, private route:ActivatedRoute, private router:Router) { }

  ngOnInit() {
    this.username=this.route.snapshot.children[0].paramMap.get('username')!
  }

  onSubmit(){
    this.jwtToken$.subscribe((token:any)=>{

    const title= this.profileForm.controls.title.value!
    const percentaje= Number(this.profileForm.controls.percentaje.value!)
    const icon= this.profileForm.controls.icon.value!
    const color= '#'+this.colorCtr.value.hex

    this.portfolioService.createSkill(title,percentaje,icon?.substring(10,icon.length-6),color,this.username,{headers: {'Content-Type':'application/json','Authorization':`Bearer ${token}`}}).subscribe((skill)=>{
      this.portfolioService.setSkill(skill)
    })
   })

    }

}
