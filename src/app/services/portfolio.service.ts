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

  public portfolioSubject = new Subject();
  public bannerSubject = new Subject();
  public avatarSubject = new Subject();
  public welcomeSubject = new Subject();
  public aboutmeSubject = new Subject();
  public aboutmeAddSubject = new Subject();
  public networkSubject = new Subject();
  public educationSubject = new Subject();
  public educationEditSubject = new Subject();
  public experienceSubject = new Subject();
  public experienceEditSubject = new Subject();
  public skillSubject = new Subject();
  public skillEditSubject = new Subject();
  public projectSubject = new Subject();
  public projectEditSubject = new Subject();

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {

  }

// METODO GET PARA TRAER TODO EL PORTFOLIO
  public getPortfolio(username:string): Observable<Object>{
    return this.httpClient.get(this.portfolioURL+'/'+username)
  }

  setPortfolioSubject(portfolio:any){
    this.portfolioSubject.next(portfolio)
  }
  
  getPortfolioSubject(){
    return this.portfolioSubject
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

public createAboutme(message:any, username:any, httpOptions:any): Observable<any>{
  return this.httpClient.post<any>(this.portfolioURL+'/'+username+'/'+'aboutme', {message:message, userUsername:username},httpOptions)
}
setAddAboutme(network:any){
  this.aboutmeAddSubject.next(network)
}
getAddAboutme(){
  return this.aboutmeAddSubject
}

public createEducation(title:string, subtitle:string, detail:string, color:string, image:string, username:string, httpOptions:any): Observable<any>{
  return this.httpClient.post<any>(this.portfolioURL+'/'+username+'/'+'education', {title:title,subtitle:subtitle,detail:detail,color:color,image:image, userUsername:username},httpOptions)
}
setEducation(education:any){
  this.educationSubject.next(education)
}
getEducation(){
  return this.educationSubject
}

public createExperience(title:string, subtitle:string, detail:string, color:string, image:string, username:string, httpOptions:any): Observable<any>{
  return this.httpClient.post<any>(this.portfolioURL+'/'+username+'/'+'experience', {title:title,subtitle:subtitle,detail:detail,color:color,image:image, userUsername:username},httpOptions)
}
setExperience(experience:any){
  this.experienceSubject.next(experience)
}
getExperience(){
  return this.experienceSubject
}

public createSkill(title:string, percentaje:number, icon:string, color:string, username:string, httpOptions:any): Observable<any>{
  return this.httpClient.post<any>(this.portfolioURL+'/'+username+'/'+'skill', {title:title,percentaje:percentaje,icon:icon,color:color,userUsername:username},httpOptions)
}
setSkill(skill:any){
  this.skillSubject.next(skill)
}
getSkill(){
  return this.skillSubject
}

public createProject(title:string, description:string, link:string, image:string, username:string, httpOptions:any): Observable<any>{
  return this.httpClient.post<any>(this.portfolioURL+'/'+username+'/'+'project', {title:title,description:description,link:link,image:image,userUsername:username},httpOptions)
}
setProject(project:any){
  this.projectSubject.next(project)
}
getProject(){
  return this.projectSubject
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

  public editEducation(id:any, education:any,username:any, httpOptions:any): Observable<any>{
    return this.httpClient.put<any>(this.portfolioURL+'/'+username+'/'+'education'+'/'+id, education,httpOptions)
  }
  setEditEducation(education:any){
    this.educationEditSubject.next(education)
  }
  getEditEducation(){
    return this.educationEditSubject
  }

  public editExperience(id:any, experience:any,username:any, httpOptions:any): Observable<any>{
    return this.httpClient.put<any>(this.portfolioURL+'/'+username+'/'+'experience'+'/'+id, experience,httpOptions)
  }
  setEditExperience(experience:any){
    this.experienceEditSubject.next(experience)
  }
  getEditExperience(){
    return this.experienceEditSubject
  }

  public editSkill(id:any, skill:any,username:any, httpOptions:any): Observable<any>{
    return this.httpClient.put<any>(this.portfolioURL+'/'+username+'/'+'skill'+'/'+id, skill,httpOptions)
  }
  setEditSkill(skill:any){
    this.skillEditSubject.next(skill)
  }
  getEditSkill(){
    return this.skillEditSubject
  }

  public editProject(id:any, project:any,username:any, httpOptions:any): Observable<any>{
    return this.httpClient.put<any>(this.portfolioURL+'/'+username+'/'+'project'+'/'+id, project,httpOptions)
  }
  setEditProject(project:any){
    this.projectEditSubject.next(project)
  }
  getEditProject(){
    return this.projectEditSubject
  }

//// METODOS DELETE /////

public deleteNetwork(id:any,username:any, httpOptions:any): Observable<any>{
  return this.httpClient.delete<any>(this.portfolioURL+'/'+username+'/'+'network'+'/'+id, httpOptions)
}
public deleteAboutme(id:any,username:any, httpOptions:any): Observable<any>{
  return this.httpClient.delete<any>(this.portfolioURL+'/'+username+'/'+'aboutme'+'/'+id, httpOptions)
}
public deleteEducation(id:any,username:any, httpOptions:any): Observable<any>{
  return this.httpClient.delete<any>(this.portfolioURL+'/'+username+'/'+'education'+'/'+id, httpOptions)
}
public deleteExperience(id:any,username:any, httpOptions:any): Observable<any>{
  return this.httpClient.delete<any>(this.portfolioURL+'/'+username+'/'+'experience'+'/'+id, httpOptions)
}
public deleteSkill(id:any,username:any, httpOptions:any): Observable<any>{
  return this.httpClient.delete<any>(this.portfolioURL+'/'+username+'/'+'skill'+'/'+id, httpOptions)
}
public deleteProject(id:any,username:any, httpOptions:any): Observable<any>{
  return this.httpClient.delete<any>(this.portfolioURL+'/'+username+'/'+'project'+'/'+id, httpOptions)
}
}
