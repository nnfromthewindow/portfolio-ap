import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import { RegisterModalComponent } from '../register-modal/register-modal.component';
import { MatDialogRef} from '@angular/material/dialog';
@Component({
  selector: 'login-modal',
  templateUrl: 'login-modal.component.html',
  styleUrls: ['./login-modal.component.css'],
})
export class LoginModalComponent implements OnInit{
  constructor(public dialog: MatDialog, public dialogRef: MatDialogRef<RegisterModalComponent>) {}

   ngOnInit(): void {

  }
  hide = true;

  profileForm = new FormGroup({
    username: new FormControl('', [Validators.required,
    Validators.minLength(4), Validators.maxLength(15)]),
    password: new FormControl('', [Validators.required,
      Validators.minLength(8), Validators.maxLength(15), Validators.pattern(/[A-Z]/),
      Validators.pattern(/[a-z]/),
      Validators.pattern(/[0-9]/),]),

  });

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.profileForm.value);
  }
  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(RegisterModalComponent, {
      width: '20rem',
      enterAnimationDuration,
      exitAnimationDuration,
    });
    this.dialogRef.close()

  }

}
