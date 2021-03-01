import {
  Component,
  OnInit,
  ViewChild,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';

import { ModalDirective } from 'ngx-bootstrap/modal';

import { Observable } from 'rxjs';

import { PersonService } from '../../services/person.service';
import { Person, sortAlphaFN } from '../../models/person.model';
import { PersonMaintFormService } from './person-maint-form/person-maint-form.service';

// import { PersonMaintFormComponent } from './person-maint-form/person-maint-form.component';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css'],
})
export class PeopleComponent implements OnInit {
  // @Output() editPerson = new EventEmitter<Person>();
  // @Output() createNewPerson = new EventEmitter<Person>();

  tableData$: Observable<Person[]>;
  allData$: Observable<Person[]>;

  count: number;
  next: string;
  previous: string;

  recordTitle: string;
  id = null;

  isFetching: boolean = false;

  baseUrl: string = 'api/people/people-list/';

  // @ViewChild(PersonMaintFormComponent)
  // public maintModal: PersonMaintFormComponent;
  @ViewChild('deleteModal', { static: false })
  public deleteModal: ModalDirective;

  constructor(
    private personService: PersonService,
    private personMaintService: PersonMaintFormService
  ) {
    // console.log('Constructor');
  }

  ngOnInit(): void {
    // console.log('On Init');
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
    //   .getAll(this.baseUrl)
    //   .pipe(map((person) => person.result.sort(sortAlphaFN)));

    // this.tableData$ = person$;

    this.isFetching = false;
    // this.tableData$ = person$;
  }

  addRecord() {
    const row = null;
    this.personMaintService.open(row);
  }

  editRecord(row) {
    console.log('Triggered Edit');
    this.personMaintService.open(row);
  }

  personCreated(person: Person) {
    this.getTableData();
  }

  personUpdated(person: Person) {
    this.getTableData();
  }

  confirmDelete(record) {
    this.id = record.id;
    this.recordTitle = record.full_name;
    this.deleteModal.show();
  }
  deleteRecord() {
    this.personService.delete(this.id).subscribe((result) => {
      this.getTableData();
    });
    this.deleteModal.hide();
  }
}
