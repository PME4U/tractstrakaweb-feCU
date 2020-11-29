import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonsModule } from 'ngx-bootstrap/buttons';

import { ModalModule } from 'ngx-bootstrap/modal';

import { PeopleComponent } from './people.component';
import { PeopleRoutingModule } from './people-routing.module';

@NgModule({
  declarations: [PeopleComponent],
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
