import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonsModule } from 'ngx-bootstrap/buttons';

import { ModalModule } from 'ngx-bootstrap/modal';

import { ProcurementMethodsComponent } from './procurement-methods.component';
import { ProcurementMethodsRoutingModule } from './procurement-methods-routing.module';

@NgModule({
  declarations: [ProcurementMethodsComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ProcurementMethodsRoutingModule,
    FormsModule,
    ButtonsModule,
    ModalModule.forChild(),
  ],
})
export class ProcurementMethodsModule {}
