import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { LoginModalComponent } from '../../../auth/login-modal/login-modal.component';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { NetworkAddModalComponent } from '../network-add-modal/network-add-modal.component';
import { Store } from '@ngrx/store';
import * as fromAuth from '../../../state/auth/auth.reducer'
import * as AuthActions from '../../../state/auth/auth.actions'
import { TokenService } from 'src/app/services/token.service';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { PortfolioService } from 'src/app/services/portfolio.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit{

jwtToken$ = this.store.select(fromAuth.selectToken);
//user$ = this.store.select(fromAuth.selectUser);
username?:string;
networks!:any[];
public networkSubscription!: Subscription;

constructor(public dialog: MatDialog,  private store: Store<fromAuth.State>, private tokenService:TokenService, private portfolioService:PortfolioService) {}



  ngOnInit(): void {
    var username= location.pathname.substring(1,location.pathname.length)
    this.portfolioService.getPortfolio(username).subscribe({next:(port:any)=>{
      this.networks=Object.values(port[0])
      this.networks= this.networks[0]
      this.networkSubscription=this.portfolioService.getNetwork().subscribe((resp:any)=>{
        this.networks.push(resp)
      })

    }})

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

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.networks, event.previousIndex, event.currentIndex);
  }
  deleteNetwork(id:string, username:string): void{
    this.jwtToken$.subscribe((token:any)=>{
   this.portfolioService.deleteNetwork(id, username,{
    headers: {'Content-Type':'application/json','Authorization':`Bearer ${token}`}
 }).subscribe((resp)=>this.portfolioService.setNetwork(resp))

  })
    /* if(this.networks.length ==1){
      this.networks.pop();
    }
    if (id > -1) {
      this.networks.splice(id-1, 1);
    }
  */}
}
