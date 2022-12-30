import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {MatDialog} from '@angular/material/dialog';
import { EducationModalComponent } from '../education-modal/education-modal.component';
import { UploadImageModalComponent } from '../upload-image-modal/upload-image-modal.component';
import { EducationTextModalComponent } from '../education-text-modal/education-text-modal.component';
import * as fromAuth from '../../../state/auth/auth.reducer'
import { Store } from '@ngrx/store';
import { PortfolioService } from 'src/app/services/portfolio.service';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})
export class EducationComponent implements OnInit {
 
  jwtToken$ = this.store.select(fromAuth.selectToken);
  //user$ = this.store.select(fromAuth.selectUser);
  education!:any[];

  constructor(public dialog: MatDialog, private store: Store<fromAuth.State>, private portfolioService:PortfolioService) {}

  ngOnInit() {
    var username= location.pathname.substring(1,location.pathname.length)
    this.portfolioService.getPortfolio(username).subscribe({next:(port:any)=>{
        this.education=Object.values(port[5]) 
        this.education= this.education[0]
  
    }})
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.education, event.previousIndex, event.currentIndex);
  }

  openAddDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(EducationModalComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
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
  deleteEducation(id:number): void{

    if(this.education.length ==1){
      this.education.pop();
    }
    if (id > -1) {
      this.education.splice(id-1, 1);
    }

  }
}
