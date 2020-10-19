import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonsModule } from 'ngx-bootstrap/buttons';

import { ModalModule } from 'ngx-bootstrap/modal';

import { BusinessUnitsComponent } from './business-units.component';
import { BusinessUnitsRoutingModule } from './business-units-routing.module';

@NgModule({
  declarations: [BusinessUnitsComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BusinessUnitsRoutingModule,
    FormsModule,
    ButtonsModule,
    ModalModule.forChild(),
  ],
})
export class BusinessUnitsModule {}
