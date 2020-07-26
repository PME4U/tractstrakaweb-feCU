import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonsModule } from 'ngx-bootstrap/buttons';

import { ModalModule } from 'ngx-bootstrap/modal';

import { ContractTypesComponent } from './contract-types.component';
import { ContractTypesRoutingModule } from './contract-types-routing.module';

@NgModule({
  declarations: [ContractTypesComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ContractTypesRoutingModule,
    FormsModule,
    ButtonsModule,
    ModalModule.forChild(),
  ],
})
export class ContractTypesModule {}
