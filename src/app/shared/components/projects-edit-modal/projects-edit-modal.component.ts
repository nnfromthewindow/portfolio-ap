import { Component, OnInit } from '@angular/core';
import { Color } from '@angular-material-components/color-picker';
import {  FormControl } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
@Component({
  selector: 'app-projects-edit-modal',
  templateUrl: './projects-edit-modal.component.html',
  styleUrls: ['./projects-edit-modal.component.css']
})
export class ProjectsEditModalComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  public disabled = false;
  public color: ThemePalette = 'primary';
  public touchUi = false;
  colorCtr: any = new FormControl(new Color(255, 243, 0));
}
