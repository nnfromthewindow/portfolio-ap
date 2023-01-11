import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {MatDialog} from '@angular/material/dialog';
import { ProjectsEditModalComponent } from '../projects-edit-modal/projects-edit-modal.component';
import * as fromAuth from '../../../state/auth/auth.reducer'
import { Store } from '@ngrx/store';
import { PortfolioService } from 'src/app/services/portfolio.service';
import { ProjectAddModalComponent } from '../project-add-modal/project-add-modal.component';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  jwtToken$ = this.store.select(fromAuth.selectToken);
  //user$ = this.store.select(fromAuth.selectUser);
  projects!:any[];
  public projectSubscription!: Subscription;
  public projectEditSubscription!: Subscription;

  constructor(public dialog: MatDialog, private store: Store<fromAuth.State>,private portfolioService:PortfolioService) {}
  ngOnInit(): void {
    var username= location.pathname.substring(1,location.pathname.length)
    this.portfolioService.getPortfolio(username).subscribe({next:(port:any)=>{
        this.projects=Object.values(port[8])
        this.projects= this.projects[0]

        this.projectSubscription=this.portfolioService.getProject().subscribe((resp:any)=>{
          this.projects.push(resp)
        })
    }})
  }

    drop(event: CdkDragDrop<string[]>) {
      moveItemInArray(this.projects, event.previousIndex, event.currentIndex);
    }

    openProjectAddDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
      this.dialog.open(ProjectAddModalComponent, {
        width: '250px',
        enterAnimationDuration,
        exitAnimationDuration,
      });
    }
    openTextDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
      this.dialog.open(ProjectsEditModalComponent, {
        width: '250px',
        enterAnimationDuration,
        exitAnimationDuration,
      });
    }
    deleteProject(id:number): void{

      if(this.projects.length ==1){
        this.projects.pop();
      }
      if (id > -1) {
        this.projects.splice(id-1, 1);
      }

    }

}
