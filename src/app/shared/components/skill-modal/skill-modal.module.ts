import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkillModalComponent } from './skill-modal.component';
import { AngularMaterialModuleModule } from 'src/app/angular-material-module.module';
@NgModule({
  imports: [
    CommonModule, AngularMaterialModuleModule
  ],
  exports:[SkillModalComponent],
  declarations: [SkillModalComponent]
})
export class SkillModalModule { }
