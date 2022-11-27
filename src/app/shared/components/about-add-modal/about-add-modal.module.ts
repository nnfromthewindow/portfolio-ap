import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutAddModalComponent } from './about-add-modal.component';
import { AngularMaterialModuleModule } from 'src/app/angular-material-module.module';
@NgModule({
  imports: [
    CommonModule, AngularMaterialModuleModule
  ], exports:[AboutAddModalComponent],
  declarations: [AboutAddModalComponent]
})
export class AboutAddModalModule { }
