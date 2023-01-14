import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import { RegisterModalComponent } from '../register-modal/register-modal.component';
import { MatDialogRef} from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { LoginUserDto } from 'src/app/model/login-user-dto';

import { takeUntil } from 'rxjs';
@Component({
  selector: 'login-modal',
  templateUrl: 'login-modal.component.html',
  styleUrls: ['./login-modal.component.css'],
})
export class LoginModalComponent implements OnInit{

  username!:string;
  password!:string;
  token!:string;
  hide = true;

  profileForm = new FormGroup({
    username: new FormControl('', [Validators.required,
    Validators.minLength(4), Validators.maxLength(15)]),
    password: new FormControl('', [Validators.required,
      Validators.minLength(8), Validators.maxLength(15), Validators.pattern(/[A-Z]/),
      Validators.pattern(/[a-z]/),
      Validators.pattern(/[0-9]/),]),

  });

  constructor(public dialog: MatDialog, public dialogRef: MatDialogRef<RegisterModalComponent>, private authService:AuthService, private toast:ToastrService, private router:Router) {}
  
   ngOnInit(): void {

  }

 async onSubmit(){
   this.authService.login(new LoginUserDto(this.profileForm.value.username!,this.profileForm.value.password!)).
    subscribe({next: (req)=> {
      this.token=req.token!
      this.username=req.username!
      this.authService.setUser(this.username)
},
    error: (err) => {this.toast.error('Intentelo de nuevo','Usuario Invalido',{timeOut:3000, positionClass:'toast-top-center'})},
    complete: ()=>{ this.dialogRef.close();
      this.router.navigate([this.profileForm.value.username])
      this.toast.success(`Bienvenid@ ${this.profileForm.controls.username.value!} !!!`,'Usuario logueado con exito!!!',{timeOut:3000, positionClass:'toast-top-full-width'})
                  }})

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
