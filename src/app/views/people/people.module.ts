import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonsModule } from 'ngx-bootstrap/buttons';

import { ModalModule } from 'ngx-bootstrap/modal';

import { PeopleComponent } from './people.component';
import { PeopleRoutingModule } from './people-routing.module';
import { PersonMaintFormComponent } from './person-maint-form/person-maint-form.component';

@NgModule({
  declarations: [PeopleComponent, PersonMaintFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PeopleRoutingModule,
    FormsModule,
    ButtonsModule,
    ModalModule.forChild(),
  ],
})
export class PeopleModule {}
