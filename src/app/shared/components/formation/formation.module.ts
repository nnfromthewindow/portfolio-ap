import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormationComponent } from './formation.component';
import { AngularMaterialModuleModule } from 'src/app/angular-material-module.module';
import { EditIconModule } from '../edit-icon/edit-icon.module';
import { DeleteIconModule } from '../delete-icon/delete-icon.module';
import { NewIconModule } from '../new-icon/new-icon.module';
import { UploadImageModalModule } from '../upload-image-modal/upload-image-modal.module';
import { EducationTextModalModule } from '../education-text-modal/education-text-modal.module';
import { ExperienceAddModalModule } from '../experience-add-modal/experience-add-modal.module';
import { ExperienceEditModalModule } from '../experience-edit-modal/experience-edit-modal.module';
@NgModule({
  declarations: [FormationComponent],
  imports: [CommonModule, AngularMaterialModuleModule, EditIconModule,DeleteIconModule,NewIconModule, UploadImageModalModule, EducationTextModalModule, ExperienceAddModalModule, ExperienceEditModalModule],
  exports: [FormationComponent],
})
export class FormationModule {}
