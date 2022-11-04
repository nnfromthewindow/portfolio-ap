import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormationComponent } from './formation.component';
import { MatCardModule } from '@angular/material/card';
@NgModule({
  declarations: [FormationComponent],
  imports: [CommonModule, MatCardModule],
  exports: [FormationComponent],
})
export class FormationModule {}
