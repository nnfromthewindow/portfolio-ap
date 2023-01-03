import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannerModalComponent } from './banner-modal.component';
import { AngularMaterialModuleModule } from 'src/app/angular-material-module.module';



@NgModule({
  declarations: [BannerModalComponent],
  imports: [
    CommonModule, AngularMaterialModuleModule
  ],
  exports:[BannerModalComponent]
})
export class BannerModalModule { }
