import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonsModule } from 'ngx-bootstrap/buttons';

import { ModalModule } from 'ngx-bootstrap/modal';

import { RoleTypesComponent } from './role-types.component';
import { RoleTypesRoutingModule } from './role-types-routing.module';

@NgModule({
  declarations: [RoleTypesComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RoleTypesRoutingModule,
    FormsModule,
    ButtonsModule,
    ModalModule.forChild(),
  ],
})
export class RoleTypesModule {}
