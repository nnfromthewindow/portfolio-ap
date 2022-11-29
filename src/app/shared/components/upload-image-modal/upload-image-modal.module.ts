import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadImageModalComponent } from './upload-image-modal.component';
import { AngularMaterialModuleModule } from 'src/app/angular-material-module.module';
@NgModule({
  imports: [
    CommonModule, AngularMaterialModuleModule
  ], exports:[UploadImageModalComponent],
  declarations: [UploadImageModalComponent]
})
export class UploadImageModalModule { }
