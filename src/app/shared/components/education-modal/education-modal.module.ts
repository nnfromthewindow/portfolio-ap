import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EducationModalComponent } from './education-modal.component';
import { AngularMaterialModuleModule } from 'src/app/angular-material-module.module';
@NgModule({
  imports: [
    CommonModule, AngularMaterialModuleModule
  ], exports: [EducationModalComponent],
  declarations: [EducationModalComponent]
})
export class EducationModalModule { }
