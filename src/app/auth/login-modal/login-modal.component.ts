import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import { RegisterModalComponent } from '../register-modal/register-modal.component';
import { MatDialogRef} from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginUserDto } from 'src/app/model/login-user-dto';
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

  constructor(public dialog: MatDialog, public dialogRef: MatDialogRef<RegisterModalComponent>, private authService:AuthService, private tokenService:TokenService, private toast:ToastrService,private store:Store, private router:Router, private route:ActivatedRoute) {}

   ngOnInit(): void {

  }

  async onSubmit(): Promise<any> {

    const credentials = {
      username: this.profileForm.value.username!,
      password: this.profileForm.value.password!
    };


   this.store.dispatch(AuthActions.LoginRequest.loginRequest({credentials}));
    this.authService.login(new LoginUserDto(this.profileForm.value.username!,this.profileForm.value.password!)).
    subscribe({next: (req)=> {
      //console.log(req),
      this.token=req.token!
      this.username=req.username!
     //window.location.href = this.profileForm.value.username!;
      this.router.navigate([this.profileForm.value.username])

  window.location.href = this.profileForm.value.username!;
  //this.router.navigate([this.profileForm.value.username])
},
    error: (e) => {this.toast.error('Intentelo de nuevo','Usuario Invalido',{timeOut:3000, positionClass:'toast-top-center'})},
    complete: ()=>{ this.dialogRef.close();
      this.toast.success(`Bienvenido ${this.profileForm.controls.username.value!} !!!`,'Usuario logueado con exito!!!',{timeOut:3000, positionClass:'toast-top-full-width'})
      this.tokenService.setToken(this.token)
      this.store.dispatch(AuthActions.LoginSuccess.loginSuccess({loginSuccessResponse:{
      username:this.username, token:this.token
    }
    
  }))
  //this.authService.isLoggedIn$.subscribe((res)=>res=true)
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
