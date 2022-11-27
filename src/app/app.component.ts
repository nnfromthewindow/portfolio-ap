import { Component } from '@angular/core';
declare let AOS: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'portfolio-ap';
  ngOnInit(){
    AOS.init()
    window.addEventListener('load',AOS.refresh)
  }
}
