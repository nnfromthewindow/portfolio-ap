import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {MatDialog} from '@angular/material/dialog';
import { UploadImageModalComponent } from '../upload-image-modal/upload-image-modal.component';
import { EducationTextModalComponent } from '../education-text-modal/education-text-modal.component';
import { PortfolioService } from 'src/app/services/portfolio.service';
import { filter, Subscription } from 'rxjs';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { EducationEditModalComponent } from '../education-edit-modal/education-edit-modal.component';
import { ThisReceiver } from '@angular/compiler';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})
export class EducationComponent implements OnInit {

  username!:string;
  userLogged!:string;
  token!:string;

  education!:any[];
  public educationSubscription!: Subscription;
  public educationEditSubscription!: Subscription;

  constructor(public dialog: MatDialog, private portfolioService:PortfolioService, private router:Router, public authService:AuthService, private route:ActivatedRoute) {}

  ngOnInit() {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event:any)=>{
    var username=this.route.snapshot.children[0].paramMap.get('username')!
   this.userLogged=localStorage.getItem('user')!
   this.token=localStorage.getItem('AuthToken')!
   this.portfolioService.getPortfolio(username).subscribe({next:(port:any)=>{
    this.education=Object.values(port[5]) 
    this.education= this.education[0]

    this.educationSubscription=this.portfolioService.getEducation().subscribe((resp:any)=>{
      this.education.push(resp)
    })

    this.educationEditSubscription=this.portfolioService.getEditEducation().subscribe((resp:any)=>{
      this.education.forEach((e,i)=>{
        if(e.id==resp.id){
          this.education[i]=resp
        }
      })
    })
  
  }})
  
  })



    


  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.education, event.previousIndex, event.currentIndex);
  }


  openImageDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(UploadImageModalComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
  openTextDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(EducationTextModalComponent, {
      width: '250px',
      height: '750px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
  openEditDialog(enterAnimationDuration: string, exitAnimationDuration: string, id:string): void {
    this.authService.setEditId(id);
    this.dialog.open(EducationEditModalComponent, {
      width: '250px',
      height: '750px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
 
  ///////////////////////////////////////

  deleteEducation(id:string): void{

    this.portfolioService.deleteEducation(id, this.userLogged,{
    headers: {'Content-Type':'application/json','Authorization':`Bearer ${this.token}`}
  }).subscribe()
  this.education=this.education.filter((educ)=>{return  educ.id!==id})

}
}
