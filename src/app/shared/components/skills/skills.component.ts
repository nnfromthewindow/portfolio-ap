import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { SkillEditModalComponent } from '../skill-edit-modal/skill-edit-modal.component';
import * as fromAuth from '../../../state/auth/auth.reducer'
import { Store } from '@ngrx/store';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { PortfolioService } from 'src/app/services/portfolio.service';
import { SkillAddModalComponent } from '../skill-add-modal/skill-add-modal.component';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {

  jwtToken$ = this.store.select(fromAuth.selectToken);
  //user$ = this.store.select(fromAuth.selectUser);
  username!:string
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'determinate';
  value!:any;
  skills!:any[];
  public skillSubscription!: Subscription;
  public skillEditSubscription!: Subscription;

  constructor(public dialog: MatDialog, private store: Store<fromAuth.State>, private portfolioService:PortfolioService, private router:Router, public authService:AuthService) {}

  ngOnInit() {
    this.username= location.pathname.substring(1,location.pathname.length)
    this.portfolioService.getPortfolio(this.username).subscribe({next:(port:any)=>{
        this.skills=Object.values(port[7]);
        this.skills= this.skills[0];
        this.value=this.skills[0];

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

    }})
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
      this.router.navigateByUrl(`${this.username}/skill/${id}`)

      this.dialog.open(SkillEditModalComponent, {
        width: '250px',
        enterAnimationDuration,
        exitAnimationDuration,
      });
    }

  deleteSkill(id:string, username:string): void{
    this.jwtToken$.subscribe((token:any)=>{
    this.portfolioService.deleteSkill(id, username,{
    headers: {'Content-Type':'application/json','Authorization':`Bearer ${token}`}
  }).subscribe().unsubscribe()})
  this.skills=this.skills.filter((sk)=>{return  sk.id!==id})

}
}
