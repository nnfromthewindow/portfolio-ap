import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExperienceEditModalComponent } from './experience-edit-modal.component';
import { AngularMaterialModuleModule } from 'src/app/angular-material-module.module';

@NgModule({
  imports: [
    CommonModule, AngularMaterialModuleModule  ],
  declarations: [ExperienceEditModalComponent],
  exports:[ExperienceEditModalComponent]
})
export class ExperienceEditModalModule { }
