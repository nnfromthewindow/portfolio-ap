import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { MatDialogRef} from '@angular/material/dialog';
@Component({
  selector: 'app-register-modal',
  templateUrl: './register-modal.component.html',
  styleUrls: ['./register-modal.component.css']
})
export class RegisterModalComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<RegisterModalComponent>) {}

  hide = true;
  hideVerified = true;
  ngOnInit(): void {
  }
  profileForm = new FormGroup({
    username: new FormControl('', [Validators.required,
    Validators.minLength(4), Validators.maxLength(15)]),
    password: new FormControl('', [Validators.required,
      Validators.minLength(8), Validators.maxLength(15), Validators.pattern(/[A-Z]/),
      Validators.pattern(/[a-z]/),
      Validators.pattern(/[0-9]/),]),
    passwordverified: new FormControl('', [Validators.required,
      Validators.minLength(8), Validators.maxLength(15), Validators.pattern(/[A-Z]/),
      Validators.pattern(/[a-z]/),
      Validators.pattern(/[0-9]/),]),
    email: new FormControl('',[Validators.required,Validators.email])

  });
  onSubmit() {
    // TODO: Use EventEmitter with form value
    if(this.profileForm.controls.password.value==this.profileForm.controls.passwordverified.value){
      console.warn(this.profileForm.value);
    }else{
      alert("La contraseña no es igual, intentelo de nuevo")
    }

  }
}
