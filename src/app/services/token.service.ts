import { Injectable } from '@angular/core';

const TOKEN_KEY ='AuthToken'

const USER_KEY ='user'


@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  public setToken(token:string):void{
    localStorage.setItem(TOKEN_KEY,token);
  }

  public getToken(): string | null{
    return localStorage.getItem(TOKEN_KEY);
  }

  public setUser(user:string):void{
    localStorage.setItem(USER_KEY,user);
  }

  public getUser(): string | null{
    return localStorage.getItem(USER_KEY);
  }

  public logOut(): void{
    localStorage.removeItem(TOKEN_KEY);
  }

}
