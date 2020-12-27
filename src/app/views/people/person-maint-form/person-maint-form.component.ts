import {
  Component,
  OnInit,
  ViewChild,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ModalDirective } from 'ngx-bootstrap/modal';

import { PersonService } from '../../../services/person.service';
import { Person } from '../../../models/person.model';

@Component({
  selector: 'app-person-maint-form',
  templateUrl: './person-maint-form.component.html',
  styleUrls: ['./person-maint-form.component.css'],
})
export class PersonMaintFormComponent implements OnInit {
  maintForm: FormGroup;
  id = null;

  @Output() personCreated = new EventEmitter<Person>();
  @Output() personUpdated = new EventEmitter<Person>();

  @Input() set person(val: Person) {
    this.id = val.id;
    this.fb.group({
      first_name: [val.first_name, [Validators.required]],
      middle_initial: [val.middle_initial, []],
      last_name: [val.last_name, [Validators.required]],
      profile_pic: [val.profile_pic, []],
      about_me: [val.about_me, []],
    });
  }

  @ViewChild('maintModal', { static: false }) public maintModal: ModalDirective;

  constructor(private fb: FormBuilder, private personService: PersonService) {
    // this.createForm();
  }

  ngOnInit(): void {
    // this.createForm();
    // this.maintModal.show();
  }

  // createForm() {
  //   // const today = new Date();
  //   this.maintForm = this.fb.group({
  //     first_name: ['', [Validators.required]],
  //     middle_initial: ['', []],
  //     last_name: ['', [Validators.required]],
  //     profile_pic: [null, []],
  //     about_me: ['', []],
  //     // create_date: [today, []],
  //   });
  // }

  saveRecord() {
    if (this.id) {
      this.personService
        .update(this.id, this.maintForm.value)
        .subscribe((result: Person) => {
          // this.getTableData(this.baseUrl);
          this.personUpdated.emit(result);
        });
    } else {
      this.personService
        .create(this.maintForm.value)
        .subscribe((result: Person) => {
          this.personCreated.emit(result);
          // this.getTableData(this.baseUrl);
        });
    }
    this.id = undefined;
    this.maintForm.reset();
    this.maintModal.hide();
  }

  closeModal() {
    // this.first_name = '';
    this.maintForm.reset();
    this.maintModal.hide();
  }
}
