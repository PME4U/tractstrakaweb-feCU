import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonsModule } from 'ngx-bootstrap/buttons';

import { ModalModule } from 'ngx-bootstrap/modal';

import { UserAdminComponent } from './user-admin.component';
import { UserAdminRoutingModule } from './user-admin-routing.module';

@NgModule({
  declarations: [UserAdminComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UserAdminRoutingModule,
    FormsModule,
    ButtonsModule,
    ModalModule.forChild(),
  ],
})
export class UserAdminModule {}
