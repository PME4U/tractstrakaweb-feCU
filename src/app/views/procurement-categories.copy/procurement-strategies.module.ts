import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { ModalModule } from 'ngx-bootstrap/modal';

import { ProcurementStrategiesComponent } from './procurement-strategies.component';
import { ProcurementStrategiesRoutingModule } from './procurement-strategies-routing.module';

@NgModule({
  declarations: [ProcurementStrategiesComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ButtonsModule,
    ModalModule.forChild(),
    ProcurementStrategiesRoutingModule,
    FormsModule,
    ButtonsModule,
  ],
})
export class ProcurementStrategiesModule {}
