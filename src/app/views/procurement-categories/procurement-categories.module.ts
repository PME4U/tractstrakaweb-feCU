import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { ModalModule } from 'ngx-bootstrap/modal';

import { ProcurementCategoriesComponent } from './procurement-categories.component';
import { ProcurementCategoriesRoutingModule } from './procurement-categories-routing.module';

@NgModule({
  declarations: [ProcurementCategoriesComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ButtonsModule,
    ModalModule.forChild(),
    ProcurementCategoriesRoutingModule,
    FormsModule,
    ButtonsModule,
  ],
})
export class ProcurementCategoriesModule {}
