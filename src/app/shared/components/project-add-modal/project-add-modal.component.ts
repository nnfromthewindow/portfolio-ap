
import { Component,OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { PortfolioService } from 'src/app/services/portfolio.service';
import * as fromAuth from '../../../state/auth/auth.reducer'

@Component({
  selector: 'app-project-add-modal',
  templateUrl: './project-add-modal.component.html',
  styleUrls: ['./project-add-modal.component.css']
})
export class ProjectAddModalComponent implements OnInit {

  jwtToken$ = this.store.select(fromAuth.selectToken);
  username!:string;

  profileForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    link: new FormControl('', [Validators.required]),
    image: new FormControl('', [Validators.required])
    });

  constructor(private portfolioService:PortfolioService, private store: Store<fromAuth.State>, private route:ActivatedRoute) { }

  ngOnInit() {
    this.username=this.route.snapshot.children[0].paramMap.get('username')!

  }
  onSubmit(){
    this.jwtToken$.subscribe((token:any)=>{

    const title= this.profileForm.controls.title.value!
    const description= this.profileForm.controls.description.value!
    const link= this.profileForm.controls.link.value!
    const image= this.profileForm.controls.image.value!

    this.portfolioService.createProject(title,description,link,image,this.username,{headers: {'Content-Type':'application/json','Authorization':`Bearer ${token}`}}).subscribe((project)=>{
      this.portfolioService.setProject(project)
    })
   })

    }
}
