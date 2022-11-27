import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormationModalComponent } from './formation-modal.component';
import { AngularMaterialModuleModule } from 'src/app/angular-material-module.module';
@NgModule({
  imports: [
    CommonModule, AngularMaterialModuleModule
  ], exports:[FormationModalComponent],
  declarations: [FormationModalComponent]
})
export class FormationModalModule { }
