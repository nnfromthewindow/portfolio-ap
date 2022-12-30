import { Component } from '@angular/core';
import { ActivatedRoute, ActivationEnd, NavigationEnd, Router, RouterState, RouterStateSnapshot } from '@angular/router';
import { filter } from 'rxjs';
import { PortfolioService } from './services/portfolio.service';

declare let AOS: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'portfolio-ap';


 welcome:any;
  constructor(private portfolioService:PortfolioService){

  }

  ngOnInit(){
    AOS.init()
  }
}
