import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EducationEditModalComponent } from './education-edit-modal.component';
import { AngularMaterialModuleModule } from 'src/app/angular-material-module.module';

@NgModule({
  imports: [
    CommonModule,AngularMaterialModuleModule
  ],
  declarations: [EducationEditModalComponent],
  exports:[EducationEditModalComponent]
})
export class EducationEditModalModule { }
