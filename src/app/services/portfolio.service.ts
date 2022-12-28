import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class PortfolioService implements OnInit{


  portfolioURL = environment.apiURL;


  constructor(private route: ActivatedRoute, private httpClient: HttpClient) { }


  public getPortfolio(username:any): Observable<Object>{
    return this.httpClient.get(this.portfolioURL+username)
  }

  ngOnInit(): void {

  }
}
