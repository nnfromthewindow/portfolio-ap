import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModuleModule } from 'src/app/angular-material-module.module';
import { NavbarComponent } from './navbar.component';
import { LoginModalComponent } from '../../../auth/login-modal/login-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { RegisterModalComponent } from 'src/app/auth/register-modal/register-modal.component';
import { NewIconModule } from '../new-icon/new-icon.module';
import { DeleteIconModule } from '../delete-icon/delete-icon.module';
import { NetworkAddModalModule } from '../network-add-modal/network-add-modal.module';
@NgModule({
  declarations: [NavbarComponent,LoginModalComponent, RegisterModalComponent  ],
  imports: [CommonModule, AngularMaterialModuleModule,ReactiveFormsModule, AppRoutingModule,NewIconModule,DeleteIconModule, NetworkAddModalModule],
  exports: [NavbarComponent,LoginModalComponent, RegisterModalComponent],
})
export class NavbarModule {}
