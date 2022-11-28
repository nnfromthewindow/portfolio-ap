import { Component } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { LoginModalComponent } from '../login-modal/login-modal.component';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  constructor(public dialog: MatDialog) {}

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(LoginModalComponent, {
      width: '20rem',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

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


  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.networks, event.previousIndex, event.currentIndex);
  }
  deleteNetwork(id:number): void{
    if(this.networks.length ==1){
      this.networks.pop();
    }
    if (id > -1) {
      this.networks.splice(id-1, 1);
    }
  }
}
