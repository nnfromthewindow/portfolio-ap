import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-banner-modal',
  templateUrl: './banner-modal.component.html',
  styleUrls: ['./banner-modal.component.css']
})
export class BannerModalComponent implements OnInit {

  profileForm = new FormGroup({
    link: new FormControl('', [Validators.required])
  });
  constructor() { }

  ngOnInit() {
  }

  onSubmit(){
    console.log(this.profileForm.controls.link.value)
  }
}
