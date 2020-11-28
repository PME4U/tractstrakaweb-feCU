import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonsModule } from 'ngx-bootstrap/buttons';

import { ModalModule } from 'ngx-bootstrap/modal';

import { TaxCodesComponent } from './tax-codes.component';
import { TaxCodesRoutingModule } from './tax-codes-routing.module';

@NgModule({
  declarations: [TaxCodesComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TaxCodesRoutingModule,
    FormsModule,
    ButtonsModule,
    ModalModule.forChild(),
  ],
})
export class TaxCodesModule {}
