import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {MatDialog} from '@angular/material/dialog';
import { AboutAddModalComponent } from '../about-add-modal/about-add-modal.component';
import { UploadImageModalComponent } from '../upload-image-modal/upload-image-modal.component';
import { AboutmeTextModalComponent } from '../aboutme-text-modal/aboutme-text-modal.component';
import { NetworkAddModalComponent } from '../network-add-modal/network-add-modal.component';
import * as fromAuth from '../../../state/auth/auth.reducer'
import { Store } from '@ngrx/store';
import { PortfolioService } from 'src/app/services/portfolio.service';

@Component({
  selector: 'app-aboutme',
  templateUrl: './aboutme.component.html',
  styleUrls: ['./aboutme.component.css']
})
export class AboutmeComponent implements OnInit {

  jwtToken$ = this.store.select(fromAuth.selectToken);
  //user$ = this.store.select(fromAuth.selectUser);
  networks!:any[];
  welcome!:any[];
  avatarImage!:any[];
  aboutme!:any[];

  constructor(public dialog: MatDialog, private store: Store<fromAuth.State>, private portfolioService:PortfolioService) {}

  ngOnInit() {
    var username= location.pathname.substring(1,location.pathname.length)
    this.portfolioService.getPortfolio(username).subscribe({next:(port:any)=>{

      //console.log(port[2].avatarImage.length)

      if(port[0].network.length>0 || port[1].welcome.length>0 || port[2].avatarImage.length>0 || port[4].aboutme.length>0){
      this.networks=Object.values(port[0])
      this.networks= this.networks[0]
      this.welcome=port[1].welcome
      this.welcome= this.welcome[0].message
      this.avatarImage=port[2].avatarImage
      this.avatarImage= this.avatarImage[0].image
      this.aboutme=Object.values(port[4])
      this.aboutme= this.aboutme[0]
      }
      //console.log(this.welcome)
    }})
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.networks, event.previousIndex, event.currentIndex);
  }
  dropAbout(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.aboutme, event.previousIndex, event.currentIndex);
  }

  openAddDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(AboutAddModalComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
  openAvatarDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(UploadImageModalComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
  openTextDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(AboutmeTextModalComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
  openNetworkDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(NetworkAddModalComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
  deleteAboutText(id:number): void{
    if(this.aboutme.length ==1){
      this.aboutme.pop();
    }
    if (id > -1) {
      this.aboutme.splice(id-1, 1);
    }
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
