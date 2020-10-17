import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonsModule } from 'ngx-bootstrap/buttons';

import { ModalModule } from 'ngx-bootstrap/modal';

import { ProductGroupsComponent } from './product-groups.component';
import { ProductGroupsRoutingModule } from './product-groups-routing.module';

@NgModule({
  declarations: [ProductGroupsComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ProductGroupsRoutingModule,
    FormsModule,
    ButtonsModule,
    ModalModule.forChild(),
  ],
})
export class ProductGroupsModule {}
