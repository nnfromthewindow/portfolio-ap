import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { SkillEditModalComponent } from '../skill-edit-modal/skill-edit-modal.component';
import { Store } from '@ngrx/store';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { PortfolioService } from 'src/app/services/portfolio.service';
import { SkillAddModalComponent } from '../skill-add-modal/skill-add-modal.component';
import { filter, Subscription } from 'rxjs';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {

  username!:string
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'determinate';
  value!:any;
  skills!:any[];
  userLogged!:string;
  token!:string;

  public skillSubscription!: Subscription;
  public skillEditSubscription!: Subscription;

  constructor(public dialog: MatDialog, private portfolioService:PortfolioService, private router:Router, private route:ActivatedRoute, public authService:AuthService) {}

  ngOnInit() {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event:any)=>{
      var username=this.route.snapshot.children[0].paramMap.get('username')!
      this.userLogged=localStorage.getItem('user')!
      this.token=localStorage.getItem('AuthToken')!
      this.portfolioService.getPortfolio(username).subscribe({next:(port:any)=>{
          this.skills=Object.values(port[7]);
          this.skills= this.skills[0];
          this.value=this.skills[0];
      }})
      
    })
    
    this.skillSubscription=this.portfolioService.getSkill().subscribe((resp:any)=>{
      this.skills.push(resp)
    })

    this.skillEditSubscription=this.portfolioService.getEditSkill().subscribe((resp:any)=>{
      this.skills.forEach((e,i)=>{
        if(e.id==resp.id){
          this.skills[i]=resp
        }
      })
    })
  }

    drop(event: CdkDragDrop<string[]>) {
      moveItemInArray(this.skills, event.previousIndex, event.currentIndex);

    }

    openSkillAddDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
      this.dialog.open(SkillAddModalComponent, {
        width: '250px',
        enterAnimationDuration,
        exitAnimationDuration,
      });
    }
    openSkillEditDialog(enterAnimationDuration: string, exitAnimationDuration:string, id:string): void {
      this.authService.setEditId(id)
      this.dialog.open(SkillEditModalComponent, {
        width: '250px',
        enterAnimationDuration,
        exitAnimationDuration,
      });
    }

  deleteSkill(id:string): void{
    this.portfolioService.deleteSkill(id, this.userLogged,{
    headers: {'Content-Type':'application/json','Authorization':`Bearer ${this.token}`}
  }).subscribe()
  this.skills=this.skills.filter((sk)=>{return  sk.id!==id})

}
}
