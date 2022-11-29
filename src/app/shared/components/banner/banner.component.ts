import { Component, OnInit } from '@angular/core';
import { UploadImageModalComponent } from '../upload-image-modal/upload-image-modal.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
  }
bannerImage="../../../../assets/img/banner.jpg";

openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
  this.dialog.open(UploadImageModalComponent, {
    width: '250px',
    enterAnimationDuration,
    exitAnimationDuration,
  });
}
}
