import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { DataTableModule } from 'angular2-datatable';

import { ModalModule } from 'ngx-bootstrap/modal';

import { DataFilterPipe } from './datafilterpipe';

import { UserAdminComponent } from './user-admin.component';
import { UserAdminRoutingModule } from './user-admin-routing.module';
import { PersonMaintFormComponent } from '../people/person-maint-form/person-maint-form.component';

@NgModule({
  declarations: [UserAdminComponent, DataFilterPipe],
  imports: [
    CommonModule,
    UserAdminRoutingModule,
    FormsModule,
    DataTableModule,
    ButtonsModule,
    ModalModule.forChild(),
    PersonMaintFormComponent,
  ],
})
export class UserAdminModule {}
