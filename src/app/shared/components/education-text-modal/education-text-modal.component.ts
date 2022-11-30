import { Component, OnInit } from '@angular/core';
import { Color } from '@angular-material-components/color-picker';
import {  FormControl } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
@Component({
  selector: 'app-education-text-modal',
  templateUrl: './education-text-modal.component.html',
  styleUrls: ['./education-text-modal.component.css']
})
export class EducationTextModalComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  public disabled = false;
  public color: ThemePalette = 'primary';
  public touchUi = false;
  colorCtr: any = new FormControl(new Color(255, 243, 0));
  public selectedFile:any;
  public event1:any;
  imgURL: any;
  receivedImageData: any;
  base64Data: any;
  convertedImage: any;


  public  onChange(event:any) {
    console.log(event);
    this.selectedFile = event.target.files[0];

    // Below part is used to display the selected image
    let reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (event2) => {
      this.imgURL = reader.result;
  };

 }
}
