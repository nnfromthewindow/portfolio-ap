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

  public bannerSubject = new Subject();
  public avatarSubject = new Subject();
  public welcomeSubject = new Subject();
  public aboutmeSubject = new Subject();
  public networkSubject = new Subject();

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {

  }

// METODO GET PARA TRAER TODO EL PORTFOLIO
  public getPortfolio(username:string): Observable<Object>{
    return this.httpClient.get(this.portfolioURL+'/'+username)
  }

////  METODOS POST //////
public createNetwork(title:any, icon:any, link:any, username:any, httpOptions:any): Observable<any>{
  return this.httpClient.post<any>(this.portfolioURL+'/'+username+'/'+'network', {title:title,icon:icon,link:link, userUsername:username},httpOptions)
}
setNetwork(network:any){
  this.networkSubject.next(network)
}
getNetwork(){
  return this.networkSubject
}


////  METODOS PUT //////

  public editBannerImage(id:any, image:any, username:any, httpOptions:any): Observable<any>{
    return this.httpClient.put<any>(this.portfolioURL+'/'+username+'/'+'banner'+'/'+id, image,httpOptions)
  }

  setBanner(banner:any){
    this.bannerSubject.next(banner)
  }
  getBanner(){
    return this.bannerSubject
  }

  public editAvatarImage(id:any, image:any, username:any, httpOptions:any): Observable<any>{
    return this.httpClient.put<any>(this.portfolioURL+'/'+username+'/'+'avatar'+'/'+id, image,httpOptions)
  }
  setAvatar(avatar:any){
    this.avatarSubject.next(avatar)
  }
  getAvatar(){
    return this.avatarSubject
  }

  public editWelcome(id:any, text:any, username:any, httpOptions:any): Observable<any>{
    return this.httpClient.put<any>(this.portfolioURL+'/'+username+'/'+'welcome'+'/'+id, text,httpOptions)
  }
  setWelcome(welcome:any){
    this.welcomeSubject.next(welcome)
  }
  getWelcome(){
    return this.welcomeSubject
  }

  public editAboutme(id:any, text:any, username:any, httpOptions:any): Observable<any>{
    return this.httpClient.put<any>(this.portfolioURL+'/'+username+'/'+'aboutme'+'/'+id, text,httpOptions)
  }
  setAboutme(aboutme:any){
    this.aboutmeSubject.next(aboutme)
  }
  getAboutme(){
    return this.aboutmeSubject
  }

//// METODOS DELETE /////

public deleteNetwork(id:any,username:any, httpOptions:any): Observable<any>{
  return this.httpClient.delete<any>(this.portfolioURL+'/'+username+'/'+'network'+'/'+id, httpOptions)
}


}
