import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EducationTextModalComponent } from './education-text-modal.component';
import { AngularMaterialModuleModule } from 'src/app/angular-material-module.module';

@NgModule({
  imports: [
    CommonModule, AngularMaterialModuleModule
  ],exports:[EducationTextModalComponent],
  declarations: [EducationTextModalComponent]
})
export class EducationTextModalModule { }
