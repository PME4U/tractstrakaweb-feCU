import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonsModule } from 'ngx-bootstrap/buttons';

import { ModalModule } from 'ngx-bootstrap/modal';

import { ContractorRoleTypesComponent } from './contractor-role-types.component';
import { ContractorRoleTypesRoutingModule } from './contractor-role-types-routing.module';

@NgModule({
  declarations: [ContractorRoleTypesComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ContractorRoleTypesRoutingModule,
    FormsModule,
    ButtonsModule,
    ModalModule.forChild(),
  ],
})
export class ContractorRoleTypesModule {}
