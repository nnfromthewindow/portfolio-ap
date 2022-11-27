import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-skill-modal',
  templateUrl: './skill-modal.component.html',
  styleUrls: ['./skill-modal.component.css']
})
export class SkillModalComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<SkillModalComponent>) {}


  ngOnInit() {
  }

}
