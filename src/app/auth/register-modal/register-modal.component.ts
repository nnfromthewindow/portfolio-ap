import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { MatDialogRef} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CreateUserDto } from 'src/app/model/create-user-dto';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-register-modal',
  templateUrl: './register-modal.component.html',
  styleUrls: ['./register-modal.component.css']
})
export class RegisterModalComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<RegisterModalComponent>, private authService:AuthService, private toast:ToastrService, private router:Router) {}

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
  async onSubmit() {
    if(this.profileForm.controls.password.value==this.profileForm.controls.passwordverified.value){
      this.authService.register(new CreateUserDto(this.profileForm.controls.username.value!,this.profileForm.controls.email.value!,this.profileForm.controls.password.value!)).subscribe({
        error:(err)=>{
                 
                    this.toast.error('Usuario existente, intente con otro nombre de usuario','Usuario Existente',{timeOut:3000, positionClass:'toast-top-full-width'})
                  
                  },
        complete:()=>{
          this.toast.success(`Bienvenid@ ${this.profileForm.controls.username.value!} !!! Revisa tu correo electronico para activar tu cuenta`,'Usuario registrado con exito!!!',{timeOut:3000, positionClass:'toast-top-full-width'}),
         location.href=this.profileForm.controls.username.value!
          this.router.navigateByUrl(this.profileForm.controls.username.value!)
         this.dialogRef.close()

        }
      }
      )
    }else{
      this.toast.error('Revise que los dos campos de contraseña sean iguales','Contraseña Invalida',{timeOut:3000, positionClass:'toast-top-full-width'})
    
    }

  }
}
