import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {MatDialog} from '@angular/material/dialog';
import * as fromAuth from '../../../state/auth/auth.reducer'
import { Store } from '@ngrx/store';
import { PortfolioService } from 'src/app/services/portfolio.service';
import { ProjectAddModalComponent } from '../project-add-modal/project-add-modal.component';
import { Subscription } from 'rxjs';
import { ProjectEditModalComponent } from '../project-edit-modal/project-edit-modal.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  jwtToken$ = this.store.select(fromAuth.selectToken);
  //user$ = this.store.select(fromAuth.selectUser);
  username!:string;
  projects!:any[];
  public projectSubscription!: Subscription;
  public projectEditSubscription!: Subscription;

  constructor(public dialog: MatDialog, private store: Store<fromAuth.State>, private portfolioService:PortfolioService, private router:Router) {}
  ngOnInit(): void {
    this.username= location.pathname.substring(1,location.pathname.length)
    this.portfolioService.getPortfolio(this.username).subscribe({next:(port:any)=>{
        this.projects=Object.values(port[8])
        this.projects= this.projects[0]

        this.projectSubscription=this.portfolioService.getProject().subscribe((resp:any)=>{
          this.projects.push(resp)
        })
        this.projectEditSubscription=this.portfolioService.getEditProject().subscribe((resp:any)=>{
          this.projects.forEach((e,i)=>{
            if(e.id==resp.id){
              this.projects[i]=resp
            }
          })
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
    openProjectEditDialog(enterAnimationDuration: string, exitAnimationDuration: string, id:string): void {
      this.router.navigateByUrl(`${this.username}/project/${id}`)
      this.dialog.open(ProjectEditModalComponent, {
        width: '250px',
        enterAnimationDuration,
        exitAnimationDuration,
      });
      this.dialog.afterAllClosed.subscribe((close)=>this.router.navigateByUrl(this.username))
    }
    deleteProject(id:string, username:string): void{
      this.jwtToken$.subscribe((token:any)=>{
      this.portfolioService.deleteProject(id, username,{
      headers: {'Content-Type':'application/json','Authorization':`Bearer ${token}`}
    }).subscribe().unsubscribe()})
    this.projects=this.projects.filter((proj)=>{return proj.id!==id})
  }

}
