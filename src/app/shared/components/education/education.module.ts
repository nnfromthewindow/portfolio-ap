import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EducationComponent } from './education.component';
import { AngularMaterialModuleModule } from 'src/app/angular-material-module.module';
import { DeleteIconModule } from '../delete-icon/delete-icon.module';
import { EditIconModule } from '../edit-icon/edit-icon.module';
import { UploadImageModalModule } from '../upload-image-modal/upload-image-modal.module';
import { EducationTextModalModule } from '../education-text-modal/education-text-modal.module';
import { EducationEditModalModule } from '../education-edit-modal/education-edit-modal.module';
@NgModule({
  declarations: [EducationComponent],
  imports: [
    CommonModule, AngularMaterialModuleModule, EditIconModule, DeleteIconModule, UploadImageModalModule, EducationTextModalModule,EducationEditModalModule
  ],exports:[EducationComponent]
})
export class EducationModule { }
