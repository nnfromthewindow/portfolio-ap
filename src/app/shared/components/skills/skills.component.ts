import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { SkillModalComponent } from '../skill-modal/skill-modal.component';
@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {

  constructor(public dialog: MatDialog) {}

  ngOnInit() {
  }

  skills = [{id:1,
  title:"Javascript",
  icon:"fa-brands fa-square-js",
  percentaje:90,
  color: "red"},
  {id:2,
    title:"HTML",
    icon:"fa-brands fa-html5",
    percentaje:80,
    color: "green"}]

    drop(event: CdkDragDrop<string[]>) {
      moveItemInArray(this.skills, event.previousIndex, event.currentIndex);
    }

    openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
      this.dialog.open(SkillModalComponent, {
        width: '250px',
        enterAnimationDuration,
        exitAnimationDuration,
      });
    }
}
