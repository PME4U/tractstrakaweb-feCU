import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonsModule } from 'ngx-bootstrap/buttons';

import { ModalModule } from 'ngx-bootstrap/modal';

import { RiskClassificationsComponent } from './risk-classifications.component';
import { RiskClassificationRoutingModule } from './risk-classifications-routing.module';

@NgModule({
  declarations: [RiskClassificationsComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RiskClassificationRoutingModule,
    FormsModule,
    ButtonsModule,
    ModalModule.forChild(),
  ],
})
export class RiskClassificationsModule {}
