import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import { RegisterModalComponent } from '../register-modal/register-modal.component';
import { MatDialogRef} from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { LoginUserDto } from 'src/app/model/login-user-dto';
import { stringInputToObject } from '@angular-material-components/color-picker';
import { Store } from '@ngrx/store';
import * as AuthActions from '../../state/auth/auth.actions'
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

  constructor(public dialog: MatDialog, public dialogRef: MatDialogRef<RegisterModalComponent>, private authService:AuthService, private tokenService:TokenService, private toast:ToastrService,private store:Store, private router:Router) {}

   ngOnInit(): void {

  }
  //ESTE FUNCIONA
/*
  onSubmit():void{
    const dto = new LoginUserDto(this.profileForm.controls.username.value!,this.profileForm.controls.password.value!)
      this.authService.login(dto).subscribe({
        next:(n)=>console.log(n),
      error: ()=> this.toast.error("Usuario Invalido","Error",{timeOut:3000, positionClass:'toast-top-center'}),
    complete: ()=>console.log("Completo") }
      )
  }
*/

  async onSubmit(): Promise<any> {

    const credentials = {
      username: this.profileForm.value.username!,
      password: this.profileForm.value.password!
    };


   this.store.dispatch(AuthActions.LoginRequest.loginRequest({credentials}));
    this.authService.login(new LoginUserDto(this.profileForm.value.username!,this.profileForm.value.password!)).
    subscribe({next: (req)=> {
      //console.log(req),
      this.tokenService.setToken(req.token!)
      this.store.dispatch(AuthActions.LoginSuccess.loginSuccess({loginSuccessResponse:{
      username:req.username, token:req.token
    }
  }))
},
    error: (e) => {console.log(e),this.toast.error('Intentelo de nuevo','Usuario Invalido',{timeOut:3000, positionClass:'toast-top-center'})},
    complete: ()=>{ this.dialogRef.close();
                    this.router.navigate([this.profileForm.value.username])
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
