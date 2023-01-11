import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectAddModalComponent } from './project-add-modal.component';
import { AngularMaterialModuleModule } from 'src/app/angular-material-module.module';

@NgModule({
  imports: [
    CommonModule,AngularMaterialModuleModule
  ],
  declarations: [ProjectAddModalComponent],
  exports:[ProjectAddModalComponent]
})
export class ProjectAddModalModule { }
