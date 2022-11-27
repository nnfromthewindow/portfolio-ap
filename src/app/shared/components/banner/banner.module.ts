import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannerComponent } from './banner.component';
import { EditIconModule } from '../edit-icon/edit-icon.module';

import { AngularMaterialModuleModule } from 'src/app/angular-material-module.module';
@NgModule({
  declarations: [BannerComponent],
  imports: [CommonModule, AngularMaterialModuleModule,EditIconModule ],
  exports: [BannerComponent],
})
export class BannerModule {}
