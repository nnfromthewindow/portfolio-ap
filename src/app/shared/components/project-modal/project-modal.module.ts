import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectModalComponent } from './project-modal.component';
import { AngularMaterialModuleModule } from 'src/app/angular-material-module.module';
@NgModule({
  imports: [
    CommonModule, AngularMaterialModuleModule
  ], exports:[ProjectModalComponent],
  declarations: [ProjectModalComponent]
})
export class ProjectModalModule { }
