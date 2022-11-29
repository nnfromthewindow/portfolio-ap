import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutmeTextModalComponent } from './aboutme-text-modal.component';
import { AngularMaterialModuleModule } from 'src/app/angular-material-module.module';
@NgModule({
  imports: [
    CommonModule, AngularMaterialModuleModule
  ], exports:[AboutmeTextModalComponent],
  declarations: [AboutmeTextModalComponent]
})
export class AboutmeTextModalModule { }
