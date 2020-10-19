import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonsModule } from 'ngx-bootstrap/buttons';

import { ModalModule } from 'ngx-bootstrap/modal';

import { BusinessUnitLevelsComponent } from './business-unit-levels.component';
import { BusinessUnitLevelsRoutingModule } from './business-unit-levels-routing.module';

@NgModule({
  declarations: [BusinessUnitLevelsComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BusinessUnitLevelsRoutingModule,
    FormsModule,
    ButtonsModule,
    ModalModule.forChild(),
  ],
})
export class BusinessUnitLevelsModule {}
