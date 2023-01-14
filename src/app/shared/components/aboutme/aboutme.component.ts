import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {MatDialog} from '@angular/material/dialog';
import { AboutmeTextModalComponent } from '../aboutme-text-modal/aboutme-text-modal.component';
import { NetworkAddModalComponent } from '../network-add-modal/network-add-modal.component';
import { PortfolioService } from 'src/app/services/portfolio.service';
import { AvatarModalComponent } from '../avatar-modal/avatar-modal.component';
import { filter, Subscription } from 'rxjs';
import { WelcomeModalComponent } from '../welcome-modal/welcome-modal.component';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { AboutmeAddTextModalComponent } from '../aboutme-add-text-modal/aboutme-add-text-modal.component';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-aboutme',
  templateUrl: './aboutme.component.html',
  styleUrls: ['./aboutme.component.css']
})
export class AboutmeComponent implements OnInit {

  networks!:any[];
  welcome!:any[];
  avatarImage!:any[];
  aboutme!:any[];
  username!:string;
  userLogged!:string
  token!:string;

  public avatarSubscription!: Subscription;
  public welcomeSubscription!: Subscription;
  public aboutmeSubscription!: Subscription;
  public aboutmeAddSubscription!: Subscription;
  public networkSubscription!: Subscription;
  
  constructor(public dialog: MatDialog, private portfolioService:PortfolioService, private router:Router, public authService:AuthService, private route:ActivatedRoute) {}

  ngOnInit() {

    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event:any)=>{
      var username=this.route.snapshot.children[0].paramMap.get('username')!
      this.userLogged=localStorage.getItem('user')!
      this.token=localStorage.getItem('AuthToken')!
  
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
        
        }
      }})

    })

    this.avatarSubscription=this.portfolioService.getAvatar().subscribe((resp:any)=>{this.avatarImage=resp.image})
    this.welcomeSubscription=this.portfolioService.getWelcome().subscribe((resp:any)=>{this.welcome=resp.message})
    this.networkSubscription=this.portfolioService.getNetwork().subscribe((resp:any)=>{
      this.networks.push(resp)
      })
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
  openEditAboutDialog(enterAnimationDuration: string, exitAnimationDuration: string, id:string): void {
    this.authService.setEditId(id);
    this.dialog.open(AboutmeTextModalComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
 
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

  deleteAboutme(id:string): void{
    const user = localStorage.getItem('user')
    const token = localStorage.getItem('AuthToken') 
    this.portfolioService.deleteAboutme(id, user,{
    headers: {'Content-Type':'application/json','Authorization':`Bearer ${token}`}
  }).subscribe()
  this.aboutme=this.aboutme.filter((ab)=>{return  ab.id!==id})
  }


  deleteNetwork(id:string): void{
    const user = localStorage.getItem('user')
    const token = localStorage.getItem('AuthToken') 
    this.portfolioService.deleteNetwork(id, user,{
    headers: {'Content-Type':'application/json','Authorization':`Bearer ${token}`}
  }).subscribe()
  this.networks=this.networks.filter((net)=>{return  net.id!==id})

}
}
