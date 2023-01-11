import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsComponent } from './projects.component';
import { AngularMaterialModuleModule } from 'src/app/angular-material-module.module';
import { EditIconModule } from '../edit-icon/edit-icon.module';
import { DeleteIconModule } from '../delete-icon/delete-icon.module';
import { ProjectsEditModalModule } from '../projects-edit-modal/projects-edit-modal.module';
import { ProjectAddModalModule } from '../project-add-modal/project-add-modal.module';
ProjectsEditModalModule
@NgModule({
  declarations: [ProjectsComponent],
  imports: [CommonModule, AngularMaterialModuleModule,EditIconModule, DeleteIconModule, ProjectsEditModalModule,ProjectAddModalModule ],
  exports: [ProjectsComponent],
})
export class ProjectsModule {


}
