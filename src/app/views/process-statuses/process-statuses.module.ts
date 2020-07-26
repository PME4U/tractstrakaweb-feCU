import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { ModalModule } from 'ngx-bootstrap/modal';

import { ProcessStatusesComponent } from './process-statuses.component';
import { ProcessStatusesRoutingModule } from './process-statuses-routing.module';

@NgModule({
  declarations: [ProcessStatusesComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ButtonsModule,
    ModalModule.forChild(),
    ProcessStatusesRoutingModule,
    FormsModule,
    ButtonsModule,
  ],
})
export class ProcessStatusesModule {}
