import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarModalComponent } from './avatar-modal.component';
import { AngularMaterialModuleModule } from 'src/app/angular-material-module.module';

@NgModule({
  imports: [
    CommonModule, AngularMaterialModuleModule
  ],
  declarations: [AvatarModalComponent],
  exports:[AvatarModalComponent]
})
export class AvatarModalModule { }
