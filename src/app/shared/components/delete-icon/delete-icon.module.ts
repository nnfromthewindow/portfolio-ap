import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeleteIconComponent } from './delete-icon.component';
import { AngularMaterialModuleModule } from 'src/app/angular-material-module.module';

@NgModule({
  declarations: [DeleteIconComponent],
  imports: [
    CommonModule, AngularMaterialModuleModule
  ], exports:[DeleteIconComponent]
})
export class DeleteIconModule { }
