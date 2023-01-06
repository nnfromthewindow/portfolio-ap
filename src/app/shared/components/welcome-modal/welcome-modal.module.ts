import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomeModalComponent } from './welcome-modal.component';
import { AngularMaterialModuleModule } from 'src/app/angular-material-module.module';

@NgModule({
  imports: [
    CommonModule,AngularMaterialModuleModule
  ],
  declarations: [WelcomeModalComponent],
  exports:[WelcomeModalComponent]
})
export class WelcomeModalModule { }
