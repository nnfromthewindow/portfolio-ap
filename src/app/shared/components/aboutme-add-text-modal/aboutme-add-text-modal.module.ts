import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutmeAddTextModalComponent } from './aboutme-add-text-modal.component';
import { AngularMaterialModuleModule } from 'src/app/angular-material-module.module';

@NgModule({
  imports: [
    CommonModule, AngularMaterialModuleModule
  ],
  declarations: [AboutmeAddTextModalComponent], 
  exports:[AboutmeAddTextModalComponent]
})
export class AboutmeAddTextModalModule { }
