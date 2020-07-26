import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonsModule } from 'ngx-bootstrap/buttons';

import { ModalModule } from 'ngx-bootstrap/modal';

import { ProcurementFrameworksComponent } from './procurement-frameworks.component';
import { ProcurementFrameworksRoutingModule } from './procurement-frameworks-routing.module';

@NgModule({
  declarations: [ProcurementFrameworksComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ProcurementFrameworksRoutingModule,
    FormsModule,
    ButtonsModule,
    ModalModule.forChild(),
  ],
})
export class ProcurementFrameworksModule {}
