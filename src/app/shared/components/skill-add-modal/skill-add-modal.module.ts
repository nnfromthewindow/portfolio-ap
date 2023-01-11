import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkillAddModalComponent } from './skill-add-modal.component';
import { AngularMaterialModuleModule } from 'src/app/angular-material-module.module';

@NgModule({
  imports: [
    CommonModule,AngularMaterialModuleModule
  ],
  declarations: [SkillAddModalComponent],
  exports:[SkillAddModalComponent]
})
export class SkillAddModalModule { }
