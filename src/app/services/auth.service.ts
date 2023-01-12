import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CreateUserDto } from '../model/create-user-dto';
import { LoginUserDto } from '../model/login-user-dto';
import { LoginResponse } from '../model/loginResponse';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

/*
  loginURL = environment.apiURL + '/login';
  registerURL = environment.apiURL + '/register';

  constructor(private httpClient: HttpClient) { }

   public login(dto: LoginUserDto): Observable<LoginResponse>{
    return this.httpClient.post(this.loginURL, dto)
  }

*/  
  public register(dto: CreateUserDto): Observable<any>{
    return this.httpClient.post(this.registerURL, dto)
  }



  loginURL = environment.apiURL + '/login';
  registerURL = environment.apiURL + '/register';

  private _isLoggedIn$ = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this._isLoggedIn$.asObservable();

  private _user$ = new BehaviorSubject<string>('');
  user$ = this._user$.asObservable();

  constructor(private httpClient: HttpClient,private tokenService:TokenService) {
  const token = localStorage.getItem('AuthToken');
  this._isLoggedIn$.next(!!token);
  }

   public login(dto: LoginUserDto){
    return this.httpClient.post(this.loginURL, dto).pipe(tap((user:any)=>{
      this._isLoggedIn$.next(true);
      localStorage.setItem('AuthToken', user.token);
    }))
  }
  public logOut(){
    this.tokenService.logOut()
    this._isLoggedIn$.next(false);
  }
  public setUser(username:string){
    this._user$.next(username);
  }
}
