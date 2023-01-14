import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CreateUserDto } from '../model/create-user-dto';
import { LoginUserDto } from '../model/login-user-dto';
import { LoginResponse } from '../model/loginResponse';
import { PortfolioService } from './portfolio.service';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  public register(dto: CreateUserDto): Observable<any>{
    return this.httpClient.post(this.registerURL, dto)
  }


  loginURL = environment.apiURL + '/login';
  registerURL = environment.apiURL + '/register';

  private _isLoggedIn$ = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this._isLoggedIn$.asObservable();

  private _user$ = new BehaviorSubject<string>('');
  user$ = this._user$.asObservable();

  private _editId$ = new BehaviorSubject<string>('');
  editId$ = this._editId$.asObservable();
/*
  private _educationId$ = new BehaviorSubject<string>('');
  educationId$ = this._user$.asObservable();

  private _experienceId$ = new BehaviorSubject<string>('');
  experienceId$ = this._user$.asObservable();

  private _skillId$ = new BehaviorSubject<string>('');
  skillId$ = this._user$.asObservable();

  private _projectId$ = new BehaviorSubject<string>('');
  projectId$ = this._user$.asObservable();
*/
  constructor(private httpClient: HttpClient,private tokenService:TokenService, private router:Router, private portfolioService:PortfolioService) {
  const token = localStorage.getItem('AuthToken');
  this._isLoggedIn$.next(!!token);
  }

   public login(dto: LoginUserDto){
    return this.httpClient.post(this.loginURL, dto).pipe(tap((user:any)=>{
      this._isLoggedIn$.next(true);
      this._user$.next(user.username);
      localStorage.setItem('AuthToken', user.token);
      localStorage.setItem('user', user.username);
   
      
    }))
  }
  public logOut(){
    const user= localStorage.getItem('user')
    this.tokenService.logOut()
    this._isLoggedIn$.next(false);
    localStorage.removeItem('user')
  }

  //SETTERS PARA LOS BEHAVIOUR SUBJECTS 
  
  public setIsLoggedIn(logged:boolean){
    this._isLoggedIn$.next(logged);
  }
  public setUser(username:string){
    this._user$.next(username);
  }
  public setEditId(id:string){
    this._editId$.next(id);
  }

}
