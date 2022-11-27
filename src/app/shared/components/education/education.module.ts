import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EducationComponent } from './education.component';
import { AngularMaterialModuleModule } from 'src/app/angular-material-module.module';
import { DeleteIconModule } from '../delete-icon/delete-icon.module';
import { EditIconModule } from '../edit-icon/edit-icon.module';
import { EducationModalModule } from '../education-modal/education-modal.module';
@NgModule({
  declarations: [EducationComponent],
  imports: [
    CommonModule, AngularMaterialModuleModule, EditIconModule, DeleteIconModule, EducationModalModule
  ],exports:[EducationComponent]
})
export class EducationModule { }
