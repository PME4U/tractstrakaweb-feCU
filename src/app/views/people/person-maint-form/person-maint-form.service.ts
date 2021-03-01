import { Injectable } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';

import { PersonMaintFormComponent } from './person-maint-form.component';

@Injectable({ providedIn: 'root' })
export class PersonMaintFormService {
  private modalRef: any;

  constructor(private modalService: BsModalService) {}

  add(modal: any) {
    // add modal to array of active modals
    this.modalRef.push(modal);
  }

  remove(id: string) {
    // remove modal from array of active modals
    this.modalRef = this.modalRef.filter((x) => x.id !== id);
  }

  open(row: any) {
    // open modal specified by id
    // const modal = this.modals.find((x) => x.id === id);
    // modal.open();
    const initialState = {};
    console.log('triggered Service');
    this.modalRef = this.modalService.show(PersonMaintFormComponent, row);
  }

  close(id: string) {
    // close modal specified by id
    const modal = this.modalRef.find((x) => x.id === id);
    modal.close();
  }
}
