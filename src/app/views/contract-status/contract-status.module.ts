import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonsModule } from 'ngx-bootstrap/buttons';

import { ModalModule } from 'ngx-bootstrap/modal';

import { ContractStatusComponent } from './contract-status.component';
import { ContractStatusRoutingModule } from './contract-status-routing.module';

@NgModule({
  declarations: [ContractStatusComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ContractStatusRoutingModule,
    FormsModule,
    ButtonsModule,
    ModalModule.forChild(),
  ],
})
export class ContractStatusModule {}
