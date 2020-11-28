import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonsModule } from 'ngx-bootstrap/buttons';

import { ModalModule } from 'ngx-bootstrap/modal';

import { ProcurementSubCategoriesComponent } from './procurement-sub-categories.component';
import { ProcurementSubCategoriesRoutingModule } from './procurement-sub-categories-routing.module';

@NgModule({
  declarations: [ProcurementSubCategoriesComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ProcurementSubCategoriesRoutingModule,
    FormsModule,
    ButtonsModule,
    ModalModule.forChild(),
  ],
})
export class ProcurementSubCategoriesModule {}
