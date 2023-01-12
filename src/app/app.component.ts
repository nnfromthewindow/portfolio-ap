import { Component } from '@angular/core';
import { ActivatedRoute, ActivationEnd, NavigationEnd, Router, RouterState, RouterStateSnapshot } from '@angular/router';

import { PortfolioService } from './services/portfolio.service';
import * as fromAuth from '../app/state/auth/auth.reducer'
import { Store } from '@ngrx/store';
import { TokenService } from './services/token.service';
import { AuthService } from './services/auth.service';

declare let AOS: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'portfolio-ap';
  username!:string;
  jwtToken$ = this.store.select(fromAuth.selectToken);

  constructor(private portfolioService:PortfolioService, private router:Router, private route:ActivatedRoute, private store: Store<fromAuth.State>, private tokenService:TokenService, private authService:AuthService){

  }

  ngOnInit(){
    AOS.init()
    this.username= location.pathname.substring(1,location.pathname.length)
    this.authService.setUser(this.username)
    this.authService.user$.subscribe((res)=>console.log(res))
  }
}
