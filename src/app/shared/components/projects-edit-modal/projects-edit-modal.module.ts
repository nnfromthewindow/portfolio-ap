import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsEditModalComponent } from './projects-edit-modal.component';
import { AngularMaterialModuleModule } from 'src/app/angular-material-module.module';
@NgModule({
  imports: [
    CommonModule, AngularMaterialModuleModule
  ],exports:[ProjectsEditModalComponent],
  declarations: [ProjectsEditModalComponent]
})
export class ProjectsEditModalModule { }
