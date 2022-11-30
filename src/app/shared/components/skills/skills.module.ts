import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkillsComponent } from './skills.component';
import { AngularMaterialModuleModule } from 'src/app/angular-material-module.module';
import { EditIconModule } from '../edit-icon/edit-icon.module';
import { DeleteIconModule } from '../delete-icon/delete-icon.module';
import { SkillModalModule } from '../skill-modal/skill-modal.module';
import { SkillEditModalModule } from '../skill-edit-modal/skill-edit-modal.module';

@NgModule({
  declarations: [SkillsComponent],
  imports: [CommonModule,AngularMaterialModuleModule,EditIconModule, DeleteIconModule, SkillModalModule, SkillEditModalModule],
  exports: [SkillsComponent],
})
export class SkillsModule {}
