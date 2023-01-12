import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CreateUserDto } from '../model/create-user-dto';
import { LoginUserDto } from '../model/login-user-dto';
import { LoginResponse } from '../model/loginResponse';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loginURL = environment.apiURL + '/login';
  registerURL = environment.apiURL + '/register';

  constructor(private httpClient: HttpClient) { }

   public login(dto: LoginUserDto): Observable<LoginResponse>{
    return this.httpClient.post(this.loginURL, dto)
  }
  public register(dto: CreateUserDto): Observable<any>{
    return this.httpClient.post(this.registerURL, dto)
  }
/*
  loginURL = environment.apiURL + '/login';
  registerURL = environment.apiURL + '/register';

  private _isLoggedIn$ = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this._isLoggedIn$.asObservable();

  constructor(private httpClient: HttpClient) {
  const token = localStorage.getItem('AuthToken');
  this._isLoggedIn$.next(!!token);
  }

   public login(dto: LoginUserDto): Observable<LoginResponse>{
    return this.httpClient.post(this.loginURL, dto).pipe(tap((resp:any)=>{
      console.log(resp.token)
      this.isLoggedIn$.subscribe((resp)=>console.log(resp))
      localStorage.setItem('AuthToken', resp.token);
    }))
  }
*/
}
