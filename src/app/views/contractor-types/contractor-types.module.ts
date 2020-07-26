import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonsModule } from 'ngx-bootstrap/buttons';

import { ModalModule } from 'ngx-bootstrap/modal';

import { ContractorTypesComponent } from './contractor-types.component';
import { ContractorTypesRoutingModule } from './contractor-types-routing.module';

@NgModule({
  declarations: [ContractorTypesComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ContractorTypesRoutingModule,
    FormsModule,
    ButtonsModule,
    ModalModule.forChild(),
  ],
})
export class ContractorTypesModule {}
