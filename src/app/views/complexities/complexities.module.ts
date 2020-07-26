import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonsModule } from 'ngx-bootstrap/buttons';

import { ModalModule } from 'ngx-bootstrap/modal';

import { ComplexitiesComponent } from './complexities.component';
import { ComplexitiesRoutingModule } from './complexities-routing.module';

@NgModule({
  declarations: [ComplexitiesComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ComplexitiesRoutingModule,
    FormsModule,
    ButtonsModule,
    ModalModule.forChild(),
  ],
})
export class ComplexitiesModule {}
