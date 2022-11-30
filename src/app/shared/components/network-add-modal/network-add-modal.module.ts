import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NetworkAddModalComponent } from './network-add-modal.component';
import { AngularMaterialModuleModule } from 'src/app/angular-material-module.module';

@NgModule({
  imports: [
    CommonModule, AngularMaterialModuleModule
  ],exports:[NetworkAddModalComponent],
  declarations: [NetworkAddModalComponent]
})
export class NetworkAddModalModule { }
