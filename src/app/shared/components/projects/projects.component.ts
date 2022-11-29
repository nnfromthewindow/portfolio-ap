import { Component } from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {MatDialog} from '@angular/material/dialog';
import { ProjectModalComponent } from '../project-modal/project-modal.component';
import { UploadImageModalComponent } from '../upload-image-modal/upload-image-modal.component';
@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent  {
  constructor(public dialog: MatDialog) {}
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
    openImageDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
      this.dialog.open(UploadImageModalComponent, {
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
