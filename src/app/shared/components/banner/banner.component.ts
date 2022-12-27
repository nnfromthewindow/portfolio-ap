import { Component, OnInit } from '@angular/core';
import { UploadImageModalComponent } from '../upload-image-modal/upload-image-modal.component';
import {MatDialog} from '@angular/material/dialog';
import * as fromAuth from '../../../state/auth/auth.reducer'
import { Store } from '@ngrx/store';
@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {
  jwtToken$ = this.store.select(fromAuth.selectToken);
  //user$ = this.store.select(fromAuth.selectUser);
  constructor(public dialog: MatDialog,  private store: Store<fromAuth.State>) {}

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
