import { Color } from '@angular-material-components/color-picker';
import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { PortfolioService } from 'src/app/services/portfolio.service';
import * as fromAuth from '../../../state/auth/auth.reducer'

@Component({
  selector: 'app-experience-edit-modal',
  templateUrl: './experience-edit-modal.component.html',
  styleUrls: ['./experience-edit-modal.component.css']
})
export class ExperienceEditModalComponent implements OnInit {
  public color: ThemePalette = 'primary';
  public touchUi = false;
  colorCtr: any=new FormControl(new Color(255,50,50))

  jwtToken$ = this.store.select(fromAuth.selectToken);
  username!:string;
  experiences!:any;
  experienceId!:string;
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
    this.experienceId=this.route.snapshot.children[0].paramMap.get('id')!

    this.portfolioService.getPortfolio(this.username).subscribe((port:any)=>{

    this.experiences= port[6].experience.filter((exp:any)=>{return exp.id==this.experienceId})
    this.experiences=this.experiences[0];

    this.title=this.experiences.title;
    this.subtitle=this.experiences.subtitle;
    this.detail=this.experiences.detail;
    this.image=this.experiences.image;

    this.profileForm.controls.title.setValue(this.title)
    this.profileForm.controls.subtitle.setValue(this.subtitle)
    this.profileForm.controls.detail.setValue(this.detail)
    this.profileForm.controls.image.setValue(this.image)

    const col= new Color(this.hexToRgb(this.experiences.color)?._r!,this.hexToRgb(this.experiences.color)?._g!,this.hexToRgb(this.experiences.color)?._b!);
    this.colorCtr= new FormControl(col)

  })

  }

  onSubmit(){
    this.jwtToken$.subscribe((token:any)=>{
      const id = this.experienceId
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

      this.portfolioService.editExperience(this.experienceId,{title:this.title,subtitle:this.subtitle,detail:this.detail,color:'#'+this.colorCtr.value.hex,image:this.image},this.username,{headers: {'Content-Type':'application/json','Authorization':`Bearer ${token}`}}).subscribe(
        (experience)=>{
          this.portfolioService.setEditExperience(experience)
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
