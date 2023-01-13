import { Component } from '@angular/core';
import { ActivatedRoute, ActivationEnd, NavigationEnd, Router, RouterState, RouterStateSnapshot } from '@angular/router';

import { PortfolioService } from './services/portfolio.service';
import * as fromAuth from '../app/state/auth/auth.reducer'
import { Store } from '@ngrx/store';
import { TokenService } from './services/token.service';
import { AuthService } from './services/auth.service';
import { ToastrService } from 'ngx-toastr';

declare let AOS: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'portfolio-ap';
  pathUser!:string;
  userLogged?:string;
  token!:string;


  constructor(private portfolioService:PortfolioService, private router:Router, private route:ActivatedRoute, private store: Store<fromAuth.State>, private tokenService:TokenService, private authService:AuthService, private toast:ToastrService){

  }

  ngOnInit(){
    AOS.init()
    this.pathUser= location.pathname.substring(1,location.pathname.length)
    this.userLogged=localStorage.getItem('user')!
    this.token=localStorage.getItem('AuthToken')!
    if(this.pathUser==this.userLogged){
      this.authService.setUser(this.userLogged)

      this.toast.success(`Bienvenido ${this.userLogged!} !!!`,'Usuario logueado con exito!!!',{timeOut:2000, positionClass:'toast-top-full-width'})
    }else{
      this.authService.logOut();
    }
  }
}
