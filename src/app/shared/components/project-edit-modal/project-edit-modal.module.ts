import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectEditModalComponent } from './project-edit-modal.component';
import { AngularMaterialModuleModule } from 'src/app/angular-material-module.module';

@NgModule({
  imports: [
    CommonModule, AngularMaterialModuleModule
  ],
  declarations: [ProjectEditModalComponent],
  exports:[ProjectEditModalComponent]
})
export class ProjectEditModalModule { }
