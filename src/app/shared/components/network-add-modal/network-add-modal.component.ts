import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { PortfolioService } from 'src/app/services/portfolio.service';
import * as fromAuth from '../../../state/auth/auth.reducer'

@Component({
  selector: 'app-network-add-modal',
  templateUrl: './network-add-modal.component.html',
  styleUrls: ['./network-add-modal.component.css']
})
export class NetworkAddModalComponent implements OnInit {
  jwtToken$ = this.store.select(fromAuth.selectToken);
  network!:any;
  networkId!:any;
  username!:any
  profileForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    link: new FormControl('', [Validators.required]),
    icon: new FormControl('', [Validators.required])
    });
  constructor(private portfolioService:PortfolioService,private store: Store<fromAuth.State>) { }

  ngOnInit() {
    this.username= location.pathname.substring(1,location.pathname.length)
 
  }

  onSubmit(){
    this.jwtToken$.subscribe((token:any)=>{
      var title = this.profileForm.controls.title.value;
      var icon = this.profileForm.controls.icon.value;
      var link = this.profileForm.controls.link.value
      this.portfolioService.createNetwork(title,icon?.substring(10,icon.length-6),link,this.username,{
        headers: {'Content-Type':'application/json','Authorization':`Bearer ${token}`}
     }).subscribe((net)=>{
      this.portfolioService.setNetwork(net)
    })

    })

  }
}
