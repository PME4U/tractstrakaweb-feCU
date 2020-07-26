import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonsModule } from 'ngx-bootstrap/buttons';

import { ModalModule } from 'ngx-bootstrap/modal';

import { CapabilitiesComponent } from './capabilities.component';
import { CapabilitiesRoutingModule } from './capabilities-routing.module';

@NgModule({
  declarations: [CapabilitiesComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CapabilitiesRoutingModule,
    FormsModule,
    ButtonsModule,
    ModalModule.forChild(),
  ],
})
export class CapabilitiesModule {}
