import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModuleModule } from 'src/app/angular-material-module.module';
import { EditIconComponent } from './edit-icon.component';

@NgModule({
  declarations: [EditIconComponent],
  imports: [
    CommonModule,AngularMaterialModuleModule
  ], exports: [EditIconComponent]
})
export class EditIconModule { }
