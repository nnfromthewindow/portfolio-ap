import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewIconComponent } from './new-icon.component';
import { AngularMaterialModuleModule } from 'src/app/angular-material-module.module';


@NgModule({
  declarations: [NewIconComponent],
  imports: [
    CommonModule, AngularMaterialModuleModule
  ], exports:[NewIconComponent]
})
export class NewIconModule { }
