import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterState, RouterStateSnapshot } from '@angular/router';
import { map } from 'rxjs';
import { tap } from 'rxjs/internal/operators/tap';
declare let AOS: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'portfolio-ap';
 public username:string | null | undefined;
  constructor(private route:Router){
    
  }

  ngOnInit(){
    AOS.init()
    window.addEventListener('load',AOS.refresh)
    //const state: RouterState = this.router.routerState;
    //const snapshot: RouterStateSnapshot = state.snapshot;
    //this.username = this.route.snapshot.root
   //  this.username = this.route.snapshot.params['username']
  //const url = this.route.snapshot.params[':username']
    console.log(this.route)
   
  }
}
