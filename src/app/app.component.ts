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
  constructor(private portfolioService:PortfolioService, private router:Router){

  }

  ngOnInit(){
    AOS.init()
   // this.router.navigateByUrl('/nuccelli')
    var username= location.pathname.substring(1,location.pathname.length)
    this.portfolioService.getPortfolio(username).subscribe({
     // next:(next)=>//console.log(next),
      error:(err:any)=>{
     if(err){
  
      this.router.navigateByUrl('/nuccelli')
    
     }
    

    }})
  }
}
