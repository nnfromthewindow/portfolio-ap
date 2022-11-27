import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutmeComponent } from './aboutme.component';
import { AngularMaterialModuleModule } from 'src/app/angular-material-module.module';
import { EditIconModule } from '../edit-icon/edit-icon.module';
import { DeleteIconModule } from '../delete-icon/delete-icon.module';
import { NewIconModule } from '../new-icon/new-icon.module';
import { AboutAddModalModule } from '../about-add-modal/about-add-modal.module';
@NgModule({
  declarations: [AboutmeComponent],
  imports: [CommonModule, AngularMaterialModuleModule, EditIconModule,DeleteIconModule, NewIconModule, AboutAddModalModule],
  exports: [AboutmeComponent],
})
export class AboutmeModule {}
