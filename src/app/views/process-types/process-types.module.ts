import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { ModalModule } from 'ngx-bootstrap/modal';

import { ProcessTypesComponent } from './process-types.component';
import { ProcessTypesRoutingModule } from './process-types-routing.module';

@NgModule({
  declarations: [ProcessTypesComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ButtonsModule,
    ModalModule.forChild(),
    ProcessTypesRoutingModule,
    FormsModule,
    ButtonsModule,
  ],
})
export class ProcessTypesModule {}
