import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExperienceAddModalComponent } from './experience-add-modal.component';
import { AngularMaterialModuleModule } from 'src/app/angular-material-module.module';

@NgModule({
  imports: [
    CommonModule,AngularMaterialModuleModule
  ],
  declarations: [ExperienceAddModalComponent],
  exports:[ExperienceAddModalComponent]
})
export class ExperienceAddModalModule { }
