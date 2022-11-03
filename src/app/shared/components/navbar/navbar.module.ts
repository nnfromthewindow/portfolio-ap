import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModuleModule } from 'src/app/angular-material-module.module';
import { NavbarComponent } from './navbar.component';

@NgModule({
  declarations: [NavbarComponent],
  imports: [CommonModule, AngularMaterialModuleModule],
  exports: [NavbarComponent],
})
export class NavbarModule {}
