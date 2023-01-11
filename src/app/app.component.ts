import { Component } from '@angular/core';
import { ActivatedRoute, ActivationEnd, NavigationEnd, Router, RouterState, RouterStateSnapshot } from '@angular/router';

import { PortfolioService } from './services/portfolio.service';
import * as fromAuth from '../app/state/auth/auth.reducer'
import { Store } from '@ngrx/store';

declare let AOS: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'portfolio-ap';
  username!:string;
  
  constructor(private portfolioService:PortfolioService, private router:Router, private route:ActivatedRoute, private store: Store<fromAuth.State>){

  }

  ngOnInit(){
    AOS.init()
 
  }
}
