import { Component, OnInit } from '@angular/core';
import anime from 'animejs';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {MatDialog} from '@angular/material/dialog';
import { EducationTextModalComponent } from '../education-text-modal/education-text-modal.component';
import { PortfolioService } from 'src/app/services/portfolio.service';
import { ExperienceAddModalComponent } from '../experience-add-modal/experience-add-modal.component';
import { filter, Subscription } from 'rxjs';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ExperienceEditModalComponent } from '../experience-edit-modal/experience-edit-modal.component';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-formation',
  templateUrl: './formation.component.html',
  styleUrls: ['./formation.component.css'],
})
export class FormationComponent implements OnInit {

  username!:string;
  experiences!:any[];
  userLogged!:string;
  token!:string;

  public experienceSubscription!: Subscription;
  public experienceEditSubscription!: Subscription;

  constructor(public dialog: MatDialog, private portfolioService:PortfolioService, private router:Router, private route:ActivatedRoute, public authService:AuthService) {}

  ngOnInit() {

    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event:any)=>{
      var username=this.route.snapshot.children[0].paramMap.get('username')!
      this.userLogged=localStorage.getItem('user')!
      this.token=localStorage.getItem('AuthToken')!
      this.portfolioService.getPortfolio(username).subscribe({next:(port:any)=>{
          this.experiences=Object.values(port[6])
          this.experiences= this.experiences[0]
        }})
    })

      this.experienceSubscription=this.portfolioService.getExperience().subscribe((resp:any)=>{
        this.experiences.push(resp)
      })
      this.experienceEditSubscription=this.portfolioService.getEditExperience().subscribe((resp:any)=>{
        this.experiences.forEach((e,i)=>{
          if(e.id==resp.id){
            this.experiences[i]=resp
          }
        })
      })
      this.overItem()
      this.overImage()

  }


  overItem() {
    anime({
      targets: '#blob-item path, #text',
      d: [
        {
          value:
            'M35.8,-43.1C44.7,-27,48.8,-13.5,50.9,2.1C52.9,17.6,52.9,35.3,44.1,43.9C35.3,52.5,17.6,52.1,1.8,50.3C-14.1,48.5,-28.1,45.3,-44.8,36.7C-61.4,28.1,-80.7,14.1,-81.2,-0.5C-81.6,-15,-63.3,-30,-46.6,-46.1C-30,-62.2,-15,-79.5,-0.7,-78.8C13.5,-78,27,-59.3,35.8,-43.1Z',
        },
        {
          value:
            'M42.2,-41.8C55.6,-28.8,67.8,-14.4,66,-1.8C64.2,10.8,48.3,21.6,35,34C21.6,46.5,10.8,60.5,-2.9,63.4C-16.5,66.3,-33.1,57.9,-42.1,45.5C-51.1,33.1,-52.6,16.5,-49.2,3.4C-45.8,-9.7,-37.5,-19.5,-28.5,-32.4C-19.5,-45.4,-9.7,-61.6,2.3,-64C14.4,-66.3,28.8,-54.8,42.2,-41.8Z',
        },
      ],
      easing: 'easeOutQuad',
      duration: 2500,
      loop: true,
      direction: 'alternate',
    }).play;
  }
  overImage() {
    anime({
      targets: '#blob-img path',
      d: [
        {
          value:
            'M47.9,-45.1C63.9,-31.9,80,-16,77.5,-2.5C75,11,54.1,22.1,38.1,31.1C22.1,40.1,11,47.1,-4.2,51.3C-19.5,55.6,-39,57,-47.9,48C-56.8,39,-55.2,19.5,-56.8,-1.6C-58.5,-22.8,-63.4,-45.5,-54.5,-58.7C-45.5,-71.8,-22.8,-75.3,-3.4,-71.9C16,-68.5,31.9,-58.2,47.9,-45.1Z',
        },
        {
          value:
            'M54,-47C68.1,-39.8,76.5,-19.9,70.6,-5.9C64.7,8.1,44.5,16.2,30.3,32.3C16.2,48.5,8.1,72.6,-3.9,76.5C-15.8,80.4,-31.6,63.9,-43.4,47.8C-55.2,31.6,-62.9,15.8,-65.5,-2.6C-68.1,-21,-65.6,-42,-53.8,-49.2C-42,-56.4,-21,-49.7,-0.6,-49.1C19.9,-48.6,39.8,-54.1,54,-47Z',
        },
      ],
      easing: 'easeOutQuad',
      duration: 2500,
      loop: true,
      direction: 'alternate',
    }).play;
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.experiences, event.previousIndex, event.currentIndex);
  }

  openAddExperienceDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(ExperienceAddModalComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
  openEditExperienceDialog(enterAnimationDuration: string, exitAnimationDuration: string, id:string): void {
    this.authService.setEditId(id)
    this.dialog.open(ExperienceEditModalComponent, {
      width: '250px',
      height: '750px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  openTextDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(EducationTextModalComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  deleteExperience(id:string): void{

    this.portfolioService.deleteExperience(id, this.userLogged,{
    headers: {'Content-Type':'application/json','Authorization':`Bearer ${this.token}`}
  }).subscribe()
  this.experiences=this.experiences.filter((exp)=>{return  exp.id!==id})

  }

}
