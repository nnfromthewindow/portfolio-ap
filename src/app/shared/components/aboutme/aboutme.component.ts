import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {MatDialog} from '@angular/material/dialog';
import { AboutAddModalComponent } from '../about-add-modal/about-add-modal.component';
@Component({
  selector: 'app-aboutme',
  templateUrl: './aboutme.component.html',
  styleUrls: ['./aboutme.component.css']
})
export class AboutmeComponent implements OnInit {

  constructor(public dialog: MatDialog) {}

  ngOnInit() {
  }
  welcome = "  Hola! me llamo Nicolás Nuccelli y soy desarrollador de páginas y aplicaciones"

  networks = [{id:1,
    title:"GitHub",
    icon:"fa-brands fa-github",
    link:"http://github.com"},
    {id:2,
    title:"LinkedIn",
    icon:"fa-brands fa-linkedin",
    link:"http://linkedin.com"},
    {id:3,
    title:"Instagram",
    icon:"fa-brands fa-instagram",
    link:"http://instagram.com"},
    {id:4,
    title:"Spotify",
    icon:"fa-brands fa-spotify",
    link:"http://spotify.com"}
    ]
    aboutme = [{text:`Desde muy chico siempre estuve en contacto con las computadoras desde
    DOS y luego Windows 3.1. Con el tiempo fui adquiriendo conocimientos en
    varios software de diseño con los cuales realizo trabajos de renders
    para una arquitecta, (AutoCad, SketchUp, Fusion 360, Adobe Suite) y
    producción musical (Ableton Live) debido a que soy musico. Soy
    desarrollador web fullstack manejando, HTML, CSS, Javascript, Bootstrap
    y frameworks como Angular y React. Manejo backend con SpringBoot además
    de manejar su dependecia de seguridad y autenticacion JWT. Tambien
    realice aplicaciones de escritorio con Java y JavaFX. Ultimamente estoy
    desarrollando proyectos de Data Science poniendo en practica los cursos
    de Machine Learning y Deep Learning realizados en Alura Latam. Como
    segundo idioma manejo Ingles con un nivel C1 Advanced segun el EF
    Standard English Test.`},{text:`Forme parte del primer grupo de Proyecto ONE dictado por Alura Latam +
    Oracle , realizando de manera satisfactoria todas las rutas de
    aprendizaje y logrando tener el reconocimiento de Alura Latam como
    ayudante ONE Helper del Grupo 3. Soy una persona que le gusta aprender
    cosas nuevas sobre todo tecnologías, que sabe trabajar en equipo y a su
    vez me considero emprendedor.`}]


  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.networks, event.previousIndex, event.currentIndex);
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(AboutAddModalComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
}
