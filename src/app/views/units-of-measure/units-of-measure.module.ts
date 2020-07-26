import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonsModule } from 'ngx-bootstrap/buttons';

import { ModalModule } from 'ngx-bootstrap/modal';

import { UnitsOfMeasureComponent } from './units-of-measure.component';
import { UnitsOfMeasureRoutingModule } from './units-of-measure-routing.module';

@NgModule({
  declarations: [UnitsOfMeasureComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UnitsOfMeasureRoutingModule,
    FormsModule,
    ButtonsModule,
    ModalModule.forChild(),
  ],
})
export class UnitsOfMeasureModule {}
