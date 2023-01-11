import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkillsComponent } from './skills.component';
import { AngularMaterialModuleModule } from 'src/app/angular-material-module.module';
import { EditIconModule } from '../edit-icon/edit-icon.module';
import { DeleteIconModule } from '../delete-icon/delete-icon.module';

import { SkillEditModalModule } from '../skill-edit-modal/skill-edit-modal.module';
import { SkillAddModalModule } from '../skill-add-modal/skill-add-modal.module';

@NgModule({
  declarations: [SkillsComponent],
  imports: [CommonModule,AngularMaterialModuleModule,EditIconModule, DeleteIconModule, SkillAddModalModule, SkillEditModalModule],
  exports: [SkillsComponent],
})
export class SkillsModule {}
