import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PortfolioService } from 'src/app/services/portfolio.service';


@Component({
  selector: 'app-network-add-modal',
  templateUrl: './network-add-modal.component.html',
  styleUrls: ['./network-add-modal.component.css']
})
export class NetworkAddModalComponent implements OnInit {

  network!:any;
  networkId!:any;
  userLogged!:string
  token!:string;

  profileForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    link: new FormControl('', [Validators.required]),
    icon: new FormControl('', [Validators.required])
    });
    
  constructor(private portfolioService:PortfolioService) { }

  ngOnInit() {
    this.userLogged=localStorage.getItem('user')!
    this.token=localStorage.getItem('AuthToken')!
  
  }

  onSubmit(){
      var title = this.profileForm.controls.title.value;
      var icon = this.profileForm.controls.icon.value;
      var link = this.profileForm.controls.link.value
      this.portfolioService.createNetwork(title,icon?.substring(10,icon.length-6),link,this.userLogged,{
        headers: {'Content-Type':'application/json','Authorization':`Bearer ${this.token}`}
     }).subscribe((net)=>{
      this.portfolioService.setNetwork(net)
    })
  }
}
