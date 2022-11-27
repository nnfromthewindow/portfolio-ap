import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {MatDialog} from '@angular/material/dialog';
import { EducationModalComponent } from '../education-modal/education-modal.component';
@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})
export class EducationComponent implements OnInit {

  constructor(public dialog: MatDialog) {}

  ngOnInit() {
  }

  education = [
    {id:1,
    institution: "Alura",
    grade:"Formacion Fullstack",
    description:"Cursos y challenges desarrollados durante todo el 2022 logrando conocimientos web fullstack, Java y Machine Learning",
    color: "#c2185b",
    img:"https://www.aluracursos.com/assets/img/alura-share.1647533644.png"},
    {id:1,
      institution: "Instituto Fortin Pavon",
      grade:"Bachillerato Comercial",
      description:"Formacion de titulo secundario completo con orientacion a contabilidad y administracion de empresas",
      color: "#5632a8",
      img:"https://acogeauncientifico.com/static/fortin-pavon-ee57eb4156b76e83fb2b3577f7b45ad1.jpg"}
  ]

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.education, event.previousIndex, event.currentIndex);
  }
  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(EducationModalComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
}
