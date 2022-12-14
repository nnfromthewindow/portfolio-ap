import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {MatDialog} from '@angular/material/dialog';
import { UploadImageModalComponent } from '../upload-image-modal/upload-image-modal.component';
import { AboutmeTextModalComponent } from '../aboutme-text-modal/aboutme-text-modal.component';
import { NetworkAddModalComponent } from '../network-add-modal/network-add-modal.component';
import * as fromAuth from '../../../state/auth/auth.reducer'
import { Store } from '@ngrx/store';
import { PortfolioService } from 'src/app/services/portfolio.service';
import { AvatarModalComponent } from '../avatar-modal/avatar-modal.component';
import { filter, Subscription } from 'rxjs';
import { WelcomeModalComponent } from '../welcome-modal/welcome-modal.component';
import { Router } from '@angular/router';
import { AboutmeAddTextModalComponent } from '../aboutme-add-text-modal/aboutme-add-text-modal.component';

@Component({
  selector: 'app-aboutme',
  templateUrl: './aboutme.component.html',
  styleUrls: ['./aboutme.component.css']
})
export class AboutmeComponent implements OnInit {

  jwtToken$ = this.store.select(fromAuth.selectToken);
  //user$ = this.store.select(fromAuth.selectUser);
  username!:string;
  networks!:any[];
  welcome!:any[];
  avatarImage!:any[];
  aboutme!:any[];
  public avatarSubscription!: Subscription;
  public welcomeSubscription!: Subscription;
  public aboutmeSubscription!: Subscription;
  public aboutmeAddSubscription!: Subscription;
 
  
  constructor(public dialog: MatDialog, private store: Store<fromAuth.State>, private portfolioService:PortfolioService, private router:Router) {}

  ngOnInit() {
    var username= location.pathname.substring(1,location.pathname.length)
    this.username=username;
    this.portfolioService.getPortfolio(username).subscribe({next:(port:any)=>{


      if(port[0].network.length>0 || port[1].welcome.length>0 || port[2].avatarImage.length>0 || port[4].aboutme.length>0){
      this.networks=Object.values(port[0])
      this.networks= this.networks[0]
      this.welcome=port[1].welcome
      this.welcome= this.welcome[0].message
      this.avatarImage=port[2].avatarImage
      this.avatarImage= this.avatarImage[0].image
      this.aboutme=Object.values(port[4])
      this.aboutme= this.aboutme[0]


      this.avatarSubscription=this.portfolioService.getAvatar().subscribe((resp:any)=>{this.avatarImage=resp.image})
      this.welcomeSubscription=this.portfolioService.getWelcome().subscribe((resp:any)=>{this.welcome=resp.message})
      this.aboutmeSubscription=this.portfolioService.getAboutme().subscribe((resp:any)=>{
        this.aboutme.forEach((e,i)=>{
          if(e.id==resp.id){
            this.aboutme[i].message=resp.message
          }
        })
      })
      this.aboutmeAddSubscription=this.portfolioService.getAddAboutme().subscribe((resp:any)=>{
        this.aboutme.push(resp)
      })
   
      
      }
    }})
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.networks, event.previousIndex, event.currentIndex);
  }
  dropAbout(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.aboutme, event.previousIndex, event.currentIndex);
  }

  openAvatarDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(AvatarModalComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
  openTextDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(WelcomeModalComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
  openAboutDialog(enterAnimationDuration: string, exitAnimationDuration: string, id:string): void {
    this.router.navigateByUrl(`${this.username}/aboutme/${id}`)
    this.dialog.open(AboutmeTextModalComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
    this.dialog.afterAllClosed.subscribe((close)=>this.router.navigateByUrl(this.username))
  }
  openAddAboutDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(AboutmeAddTextModalComponent, {
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

  //////////////////////////////////////////

  deleteAboutme(id:string, username:string): void{
    this.jwtToken$.subscribe((token:any)=>{
    this.portfolioService.deleteAboutme(id, username,{
    headers: {'Content-Type':'application/json','Authorization':`Bearer ${token}`}
  }).subscribe().unsubscribe()})
  this.aboutme=this.aboutme.filter((ab)=>{return  ab.id!==id})
  }


  deleteNetwork(id:string, username:string): void{
    this.jwtToken$.subscribe((token:any)=>{
    this.portfolioService.deleteNetwork(id, username,{
    headers: {'Content-Type':'application/json','Authorization':`Bearer ${token}`}
  }).subscribe().unsubscribe()})
  this.networks=this.networks.filter((net)=>{return  net.id!==id})

}
}
