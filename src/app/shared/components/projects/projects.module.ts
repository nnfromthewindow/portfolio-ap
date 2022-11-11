import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsComponent } from './projects.component';
import { AngularMaterialModuleModule } from 'src/app/angular-material-module.module';
@NgModule({
  declarations: [ProjectsComponent],
  imports: [CommonModule, AngularMaterialModuleModule],
  exports: [ProjectsComponent],
})
export class ProjectsModule {}
