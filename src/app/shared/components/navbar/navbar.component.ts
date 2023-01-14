import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { LoginModalComponent } from '../../../auth/login-modal/login-modal.component';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { NetworkAddModalComponent } from '../network-add-modal/network-add-modal.component';
import { TokenService } from 'src/app/services/token.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { PortfolioService } from 'src/app/services/portfolio.service';
import { filter, Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit{


username!:string;
networks!:any[];
userLogged!:string;
token!:string;

public networkSubscription!: Subscription;

constructor(public dialog: MatDialog, private route:ActivatedRoute, private portfolioService:PortfolioService, private router:Router, public authService:AuthService) {}

  ngOnInit(): void {

    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event:any)=>{

      var username=this.route.snapshot.children[0].paramMap.get('username')!
      this.userLogged=localStorage.getItem('user')!
      this.token=localStorage.getItem('AuthToken')!
      
    this.portfolioService.getPortfolio(username).subscribe({next:(port:any)=>{
 
      this.networks=Object.values(port[0])
      this.networks= this.networks[0]
    }})
  })
  
  this.portfolioService.getNetwork().subscribe((resp:any)=>{
    this.networks.push(resp)
    })

  }

  openLoginDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
  
    this.dialog.open(LoginModalComponent, {
      width: '20rem',
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

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.networks, event.previousIndex, event.currentIndex);
  }
  
  deleteNetwork(id:string): void{
    const user = localStorage.getItem('user')
    const token = localStorage.getItem('AuthToken') 
    this.portfolioService.deleteNetwork(id,user,{
    headers: {'Content-Type':'application/json','Authorization':`Bearer ${token}`}
    }).subscribe();
    this.networks=this.networks.filter((net)=>{return  net.id!==id})

}
}
