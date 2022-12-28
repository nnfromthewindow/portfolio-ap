import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { LoginModalComponent } from '../../../auth/login-modal/login-modal.component';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { NetworkAddModalComponent } from '../network-add-modal/network-add-modal.component';
import { Store } from '@ngrx/store';
import * as fromAuth from '../../../state/auth/auth.reducer'
import * as AuthActions from '../../../state/auth/auth.actions'
import { TokenService } from 'src/app/services/token.service';
import { ActivatedRoute } from '@angular/router';
import { PortfolioService } from 'src/app/services/portfolio.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit{

 jwtToken$ = this.store.select(fromAuth.selectToken);
 //user$ = this.store.select(fromAuth.selectUser);
username:string ="";
  constructor(public dialog: MatDialog,  private store: Store<fromAuth.State>, private tokenService:TokenService, private route: ActivatedRoute, private portfolioService:PortfolioService) {}
  ngOnInit(): void {
    this.username = this.route.snapshot.paramMap.get('username')!;
console.log(this.portfolioService.getPortfolio(this.username).subscribe({next:(x)=>console.log(x)}))
  }

  logOut(): void {
    this.store.dispatch(AuthActions.Logout.logout());
    this.tokenService.logOut()
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
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
