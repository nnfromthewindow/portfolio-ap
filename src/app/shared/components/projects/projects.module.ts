import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsComponent } from './projects.component';
import { AngularMaterialModuleModule } from 'src/app/angular-material-module.module';
import { EditIconModule } from '../edit-icon/edit-icon.module';
import { DeleteIconModule } from '../delete-icon/delete-icon.module';
import { ProjectAddModalModule } from '../project-add-modal/project-add-modal.module';
import { ProjectEditModalModule } from '../project-edit-modal/project-edit-modal.module';

@NgModule({
  declarations: [ProjectsComponent],
  imports: [CommonModule, AngularMaterialModuleModule,EditIconModule, DeleteIconModule,ProjectAddModalModule,ProjectEditModalModule ],
  exports: [ProjectsComponent],
})
export class ProjectsModule {


}
