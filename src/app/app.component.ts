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
  
 username:any;
  constructor(private portfolioService:PortfolioService){
    
  }

  ngOnInit(){
    AOS.init()
    
    var username= location.pathname.substring(1,location.pathname.length)
    this.portfolioService.getPortfolio(username).subscribe({next:(port)=>{var portfolio:Object; 
      portfolio=port
      
      console.log(portfolio)
    }}) 
    //this.router.events.pipe( filter(event => event instanceof NavigationEnd) ).subscribe((event) => { console.log(event)});
   
   
  }
}
