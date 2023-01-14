import {Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

import { AuthService } from './services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { filter } from 'rxjs';

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


  constructor(private authService:AuthService, private toast:ToastrService,private router:Router){

  }
 

  ngOnInit(){
    AOS.init()
 
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event:any)=>{
      const username=event.url.substring(1,event.url.length)
      const userLogged = localStorage.getItem('user');
      if(username!=userLogged){
        this.authService.setIsLoggedIn(false)
      } else this.authService.setIsLoggedIn(true)
  })
  }
}
