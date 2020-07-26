import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonsModule } from 'ngx-bootstrap/buttons';

import { ModalModule } from 'ngx-bootstrap/modal';

import { PrequalificationsComponent } from './prequalifications.component';
import { PrequalificationsRoutingModule } from './prequalifications-routing.module';

@NgModule({
  declarations: [PrequalificationsComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PrequalificationsRoutingModule,
    FormsModule,
    ButtonsModule,
    ModalModule.forChild(),
  ],
})
export class PrequalificationsModule {}
