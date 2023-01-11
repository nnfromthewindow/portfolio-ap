
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { PortfolioService } from 'src/app/services/portfolio.service';
import * as fromAuth from '../../../state/auth/auth.reducer'

@Component({
  selector: 'app-project-edit-modal',
  templateUrl: './project-edit-modal.component.html',
  styleUrls: ['./project-edit-modal.component.css']
})
export class ProjectEditModalComponent implements OnInit {

  jwtToken$ = this.store.select(fromAuth.selectToken);
  username!:string;
  projects!:any;
  projectId!:string;
  title!:string;
  description!:string;
  link!:string;
  image!:string;

  profileForm = new FormGroup({
    title: new FormControl(this.title, [Validators.required]),
    description: new FormControl(this.description, [Validators.required]),
    link: new FormControl(this.link, [Validators.required]),
    image: new FormControl(this.image, [Validators.required]),
    });

  constructor(private portfolioService:PortfolioService, private store: Store<fromAuth.State>, private route:ActivatedRoute, private router:Router) { }

  ngOnInit() {
    this.username=this.route.snapshot.children[0].paramMap.get('username')!
    this.projectId=this.route.snapshot.children[0].paramMap.get('id')!

    this.portfolioService.getPortfolio(this.username).subscribe((port:any)=>{
      console.log(port[8])
    this.projects= port[8].projects.filter((exp:any)=>{return exp.id==this.projectId})
    this.projects=this.projects[0];

    this.title=this.projects.title;
    this.description=this.projects.description;
    this.link=this.projects.link;
    this.image=this.projects.image;

    this.profileForm.controls.title.setValue(this.title)
    this.profileForm.controls.description.setValue(this.description)
    this.profileForm.controls.link.setValue(this.link)
    this.profileForm.controls.image.setValue(this.image)

  })

  }

  onSubmit(){
    this.jwtToken$.subscribe((token:any)=>{
     
      const title= this.profileForm.controls.title.value!
      const description= this.profileForm.controls.description.value!
      const link= this.profileForm.controls.link.value!
      const image= this.profileForm.controls.image.value!
  
      this.title=title;
      this.description=description;
      this.link=link;
      this.image=image;

      this.portfolioService.editProject(this.projectId,{title:this.title,description:this.description,link:this.link,image:this.image},this.username,{headers: {'Content-Type':'application/json','Authorization':`Bearer ${token}`}}).subscribe(
        (project)=>{
          this.portfolioService.setEditProject(project)
          this.router.navigateByUrl(this.username)
        }
      )
      }).unsubscribe()
  }
}
