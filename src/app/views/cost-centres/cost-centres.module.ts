import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonsModule } from 'ngx-bootstrap/buttons';

import { ModalModule } from 'ngx-bootstrap/modal';

import { CostCentresComponent } from './cost-centres.component';
import { CostCentresRoutingModule } from './cost-centres-routing.module';

@NgModule({
  declarations: [CostCentresComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CostCentresRoutingModule,
    FormsModule,
    ButtonsModule,
    ModalModule.forChild(),
  ],
})
export class CostCentresModule {}
