
import { Component,OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PortfolioService } from 'src/app/services/portfolio.service';


@Component({
  selector: 'app-project-add-modal',
  templateUrl: './project-add-modal.component.html',
  styleUrls: ['./project-add-modal.component.css']
})
export class ProjectAddModalComponent implements OnInit {

  userLogged!:string
  token!:string;

  profileForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    link: new FormControl('', [Validators.required]),
    image: new FormControl('', [Validators.required])
    });

  constructor(private portfolioService:PortfolioService) { }

  ngOnInit() {
    this.userLogged=localStorage.getItem('user')!
    this.token=localStorage.getItem('AuthToken')!

  }
  onSubmit(){

    const title= this.profileForm.controls.title.value!
    const description= this.profileForm.controls.description.value!
    const link= this.profileForm.controls.link.value!
    const image= this.profileForm.controls.image.value!

    this.portfolioService.createProject(title,description,link,image,this.userLogged,{headers: {'Content-Type':'application/json','Authorization':`Bearer ${this.token}`}}).subscribe((project)=>{
      this.portfolioService.setProject(project)
    })
    }
}
