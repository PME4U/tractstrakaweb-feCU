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

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { PersonService } from '../../services/person.service';
import { Person, sortAlphaFN } from '../../models/person.model';

@Component({
  selector: 'app-teams',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css'],
})
export class PeopleComponent implements OnInit {
  @Input() person: Person;

  @Output() editPerson = new EventEmitter<Person>();
  @Output() createNewPerson = new EventEmitter<Person>();

  tableData$: Observable<Person[]>;
  allData$: Observable<Person[]>;

  // first_name: string;

  count: number;
  next: string;
  previous: string;

  // maintForm: FormGroup;
  // recordTitle: string;
  id = null;
  // editing: boolean;
  isFetching: boolean = false;

  baseUrl: string = 'api/people/people-list/';

  // @ViewChild('maintModal', { static: false }) public maintModal: ModalDirective;
  @ViewChild('deleteModal', { static: false })
  public deleteModal: ModalDirective;
  // confirmDialogService: any;

  constructor(private personService: PersonService) {
    // this.createForm();
  }

  ngOnInit(): void {
    this.getTableData();
  }

  getTableData() {
    this.isFetching = true;

    this.personService.getAll(this.baseUrl).subscribe((result) => {
      // console.log(JSON.stringify(result));
      this.tableData$ = result.results;
      this.count = result.count;
      this.next = result.next;
      this.previous = result.previous;
    });

    // const person$ = this.personService
    //   .getAll(apiUrl)
    //   .pipe(map((person) => person.result.sort(sortAlphaFN)));

    this.isFetching = false;
    // this.tableData$ = person$;
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

  addRecord() {
    this.createNewPerson.emit();
    // this.maintModal.show();
    // this.maintForm.patchValue({
    //   is_active: true,
    // });
  }

  editRecord(person: Person) {
    this.editPerson.emit(person);
    // this.editing = true;
    // this.isFetching = true;
    // this.personService.getOne(record.id).subscribe(
    //   (response) => {
    //     this.isFetching = false;

    //     this.id = response.id;
    //     this.first_name = response.first_name;

    //     this.maintForm.patchValue({
    //       first_name: response.first_name,
    //       middle_initial: response.middle_initial,
    //       last_name: response.last_name,
    //       profile_pic: response.profile_pic,
    //       about_me: response.about_me,
    //       // create_date: response.create_date,
    //     });
    //     // console.log(response);
    //   },
    //   (error) => {
    //     alert(error.message);
    //   }
    // );
    // this.maintModal.show();
  }

  personCreated(person: Person) {
    this.getTableData();
  }

  personUpdated(person: Person) {
    this.getTableData();
  }

  confirmDelete(record) {
    this.id = record.id;
    this.deleteModal.show();
  }
  deleteRecord() {
    this.personService.delete(this.id).subscribe((result) => {
      this.getTableData();
    });
    this.deleteModal.hide();
  }

  // saveRecord() {
  //   if (this.editing) {
  //     this.personService
  //       .update(this.id, this.maintForm.value)
  //       .subscribe((result) => {
  //         this.getTableData(this.baseUrl);
  //       });
  //     this.editing = false;
  //   } else {
  //     this.personService.create(this.maintForm.value).subscribe((result) => {
  //       this.getTableData(this.baseUrl);
  //     });
  //   }
  //   this.id = undefined;
  //   this.maintForm.reset();
  //   this.maintModal.hide();
  // }

  // closeModal() {
  //   this.first_name = '';
  //   this.maintForm.reset();
  //   this.maintModal.hide();
  // }
}
