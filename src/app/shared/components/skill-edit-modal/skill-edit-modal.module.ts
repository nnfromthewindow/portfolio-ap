import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkillEditModalComponent } from './skill-edit-modal.component';
import { AngularMaterialModuleModule } from 'src/app/angular-material-module.module';
@NgModule({
  imports: [
    CommonModule, AngularMaterialModuleModule
  ], exports:[SkillEditModalComponent],
  declarations: [SkillEditModalComponent]
})
export class SkillEditModalModule { }
