import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginUserDto } from '../model/login-user-dto';
import { LoginResponse } from '../model/loginResponse';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loginURL = environment.apiURL + '/login';

  constructor(private httpClient: HttpClient) { }

   public login(dto: LoginUserDto): Observable<LoginResponse>{
    return this.httpClient.post(this.loginURL, dto)
  }
}
