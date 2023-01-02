import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {MatDialog} from '@angular/material/dialog';
import { ProjectModalComponent } from '../project-modal/project-modal.component';
import { ProjectsEditModalComponent } from '../projects-edit-modal/projects-edit-modal.component';
import * as fromAuth from '../../../state/auth/auth.reducer'
import { Store } from '@ngrx/store';
import { PortfolioService } from 'src/app/services/portfolio.service';
@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  jwtToken$ = this.store.select(fromAuth.selectToken);
  //user$ = this.store.select(fromAuth.selectUser);
  projects!:any[];

  constructor(public dialog: MatDialog, private store: Store<fromAuth.State>,private portfolioService:PortfolioService) {}
  ngOnInit(): void {
    var username= location.pathname.substring(1,location.pathname.length)
    this.portfolioService.getPortfolio(username).subscribe({next:(port:any)=>{
        this.projects=Object.values(port[8]) 
        this.projects= this.projects[0]
    // console.log(this.projects)
    }})
  }

  /*
  projects = [
   {id:1,
    title:"Encriptador de Texto",
  description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste quibusdam velit hic, at debitis voluptas impedit assumenda recusandae nostrum quidem blanditiis eius rerum, totam natus iusto quasi, accusantium nam atque?",
link:"http://netflix.com",
img:"https://github.com/nnfromthewindow/portafolio/blob/main/assets/img/encriptador.jpeg?raw=true"},
{id:2,
  title:"Juego del Ahorcado",
description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste quibusdam velit hic, at debitis voluptas impedit assumenda recusandae nostrum quidem blanditiis eius rerum, totam natus iusto quasi, accusantium nam atque?",
link:"http://mercadolibre.com",
img:"https://github.com/nnfromthewindow/portafolio/blob/main/assets/img/ahorcado.jpeg?raw=true"}];
*/
    drop(event: CdkDragDrop<string[]>) {
      moveItemInArray(this.projects, event.previousIndex, event.currentIndex);
    }

    openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
      this.dialog.open(ProjectModalComponent, {
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
