import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { SkillModalComponent } from '../skill-modal/skill-modal.component';
import { SkillEditModalComponent } from '../skill-edit-modal/skill-edit-modal.component';
import * as fromAuth from '../../../state/auth/auth.reducer'
import { Store } from '@ngrx/store';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { PortfolioService } from 'src/app/services/portfolio.service';
@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {

  jwtToken$ = this.store.select(fromAuth.selectToken);
  //user$ = this.store.select(fromAuth.selectUser);
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'determinate';
  value!:any;
  skills!:any[];

  constructor(public dialog: MatDialog, private store: Store<fromAuth.State>, private portfolioService:PortfolioService) {}

  ngOnInit() {
    var username= location.pathname.substring(1,location.pathname.length)
    this.portfolioService.getPortfolio(username).subscribe({next:(port:any)=>{
        this.skills=Object.values(port[7]);
        this.skills= this.skills[0];
        this.value=this.skills[0];

    }})
  }

    drop(event: CdkDragDrop<string[]>) {
      moveItemInArray(this.skills, event.previousIndex, event.currentIndex);
      
    }

    openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
      this.dialog.open(SkillModalComponent, {
        width: '250px',
        enterAnimationDuration,
        exitAnimationDuration,
      });
    }
    openTextDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
      this.dialog.open(SkillEditModalComponent, {
        width: '250px',
        enterAnimationDuration,
        exitAnimationDuration,
      });
    }
    deleteSkill(id:number): void{

      if(this.skills.length ==1){
        this.skills.pop();
      }
      if (id > -1) {
        this.skills.splice(id-1, 1);
      }

    }
}
