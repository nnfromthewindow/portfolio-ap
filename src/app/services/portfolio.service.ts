import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class PortfolioService implements OnInit{


  portfolioURL = environment.apiURL;
 // private bannerSubject = new BehaviorSubject<any>({});

  constructor(private httpClient: HttpClient) { }


  public getPortfolio(username:string): Observable<Object>{
    return this.httpClient.get(this.portfolioURL+'/'+username)
  }

  public editBannerImage(id:any, image:any, username:any, httpOptions:any): Observable<any>{
    return this.httpClient.put<any>(this.portfolioURL+'/'+username+'/'+'banner'+'/'+id, image,httpOptions)
  }
/*
  sendBanner(banner:any){

    this.bannerSubject.next(banner)
    console.log('Send banner: '+this.bannerSubject.next(banner))
  }
  recieveBanner():Observable<any>{
    return this.bannerSubject.asObservable()
  }
*/
  ngOnInit(): void {

  }
}
