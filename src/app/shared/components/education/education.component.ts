import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {MatDialog} from '@angular/material/dialog';
import { UploadImageModalComponent } from '../upload-image-modal/upload-image-modal.component';
import { EducationTextModalComponent } from '../education-text-modal/education-text-modal.component';
import * as fromAuth from '../../../state/auth/auth.reducer'
import { Store } from '@ngrx/store';
import { PortfolioService } from 'src/app/services/portfolio.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { EducationEditModalComponent } from '../education-edit-modal/education-edit-modal.component';


@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})
export class EducationComponent implements OnInit {
 
  jwtToken$ = this.store.select(fromAuth.selectToken);
  username!:string;
  //user$ = this.store.select(fromAuth.selectUser);
  education!:any[];
  public educationSubscription!: Subscription;
  public educationEditSubscription!: Subscription;

  constructor(public dialog: MatDialog, private store: Store<fromAuth.State>, private portfolioService:PortfolioService, private router:Router, private route:ActivatedRoute) {}

  ngOnInit() {
    this.username= location.pathname.substring(1,location.pathname.length)
    this.portfolioService.getPortfolio(this.username).subscribe({next:(port:any)=>{
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
    this.router.navigateByUrl(`${this.username}/education/${id}`)
    this.dialog.open(EducationEditModalComponent, {
      width: '250px',
      height: '750px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
 

  deleteEducation(id:number): void{

    if(this.education.length ==1){
      this.education.pop();
    }
    if (id > -1) {
      this.education.splice(id-1, 1);
    }

  }
}
