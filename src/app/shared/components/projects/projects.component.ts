import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {MatDialog} from '@angular/material/dialog';
import { PortfolioService } from 'src/app/services/portfolio.service';
import { ProjectAddModalComponent } from '../project-add-modal/project-add-modal.component';
import { filter, Subscription } from 'rxjs';
import { ProjectEditModalComponent } from '../project-edit-modal/project-edit-modal.component';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  username!:string;
  projects!:any[];
  userLogged!:string;
  token!:string;

  public projectSubscription!: Subscription;
  public projectEditSubscription!: Subscription;

  constructor(public dialog: MatDialog, private portfolioService:PortfolioService, private router:Router, public authService:AuthService, private route:ActivatedRoute) {}

  ngOnInit(): void {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event:any)=>{
      var username=this.route.snapshot.children[0].paramMap.get('username')!
      this.userLogged=localStorage.getItem('user')!
      this.token=localStorage.getItem('AuthToken')!
  
      this.portfolioService.getPortfolio(username).subscribe({next:(port:any)=>{
          this.projects=Object.values(port[8])
          this.projects= this.projects[0]
        }})
      
    })

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
      this.authService.setEditId(id);
      this.dialog.open(ProjectEditModalComponent, {
        width: '250px',
        enterAnimationDuration,
        exitAnimationDuration,
      });
    }

    deleteProject(id:string): void{

      this.portfolioService.deleteProject(id, this.userLogged,{
      headers: {'Content-Type':'application/json','Authorization':`Bearer ${this.token}`}
    }).subscribe()
    this.projects=this.projects.filter((proj)=>{return proj.id!==id})
  }

}
