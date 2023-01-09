import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutmeComponent } from './aboutme.component';
import { AngularMaterialModuleModule } from 'src/app/angular-material-module.module';
import { EditIconModule } from '../edit-icon/edit-icon.module';
import { DeleteIconModule } from '../delete-icon/delete-icon.module';
import { NewIconModule } from '../new-icon/new-icon.module';
import { AboutmeTextModalModule } from '../aboutme-text-modal/aboutme-text-modal.module';
import { AvatarModalModule } from '../avatar-modal/avatar-modal.module';
import { WelcomeModalModule } from '../welcome-modal/welcome-modal.module';
import { AboutmeAddTextModalModule } from '../aboutme-add-text-modal/aboutme-add-text-modal.module';
@NgModule({
  declarations: [AboutmeComponent],
  imports: [CommonModule, AngularMaterialModuleModule, EditIconModule,DeleteIconModule, NewIconModule, WelcomeModalModule, AvatarModalModule, AboutmeTextModalModule,AboutmeAddTextModalModule],
  exports: [AboutmeComponent],
})  
export class AboutmeModule {}
