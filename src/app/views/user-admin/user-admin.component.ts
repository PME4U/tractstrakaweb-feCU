import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ModalDirective } from 'ngx-bootstrap/modal';

import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import {
  UserAccessService,
  TableData,
} from '../../services/user-access.service';
import { TeamService } from '../../services/team.service';
import { PersonService } from '../../services/person.service';

import { User } from '../../models/user.model';
import { Team, sortAlpha } from '../../models/team.model';
import { Person } from '../../models/person.model';

@Component({
  selector: 'app-contract-type',
  templateUrl: './user-admin.component.html',
  styleUrls: ['./user-admin.component.scss'],
})
export class UserAdminComponent implements OnInit {
  user: User[];

  error: any;
  maintForm: FormGroup;
  baseUrl: string = 'api/account/account-access-list/';
  scope = 'user_admin';

  no_access: boolean = true;
  read_only: boolean = false;
  modify: boolean = false;
  create: boolean = false;
  delete: boolean = false;

  recordTitle: string;

  id = null;
  editing: boolean;
  isFetching: boolean = false;
  totalRecords: number;
  isActive: boolean;
  searchField: string;

  public teams$: Observable<Team[]>;
  public people$: Observable<Person[]>;

  public disableSearch = true;
  public searchMessage = 'Select field to search';
  public data: TableData;
  public filterQuery = '';

  @ViewChild('maintModal', { static: false }) public maintModal: ModalDirective;
  @ViewChild('deleteModal', { static: false })
  public deleteModal: ModalDirective;

  constructor(
    private fb: FormBuilder,
    private userAccessService: UserAccessService,
    private teamService: TeamService,
    private personService: PersonService
  ) {
    this.data = new Array<any>();
  }

  ngOnInit(): void {
    this.no_access = this.userAccessService.isNoAccess(this.scope);
    this.read_only = this.userAccessService.isReadOnly(this.scope);
    this.modify = this.userAccessService.isModify(this.scope);
    this.create = this.userAccessService.isCreate(this.scope);
    this.delete = this.userAccessService.isDelete(this.scope);

    this.getTableData(this.baseUrl);
    this.createForm();
  }

  getTableData(apiUrl: string) {
    if (!this.no_access) {
      this.isFetching = true;

      this.userAccessService.getAll(apiUrl).subscribe(
        (data: TableData) => {
          this.isFetching = false;
          setTimeout(() => {
            this.data = [...data];
          }, 1000);
        }, // success path
        (error) => (this.error = error) // error path
      );
    }
  }

  createForm() {
    this.maintForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      person: ['', []],
      team: ['', [Validators.required, Validators.min(1)]],
      is_active: [
        { value: true, disabled: !this.modify },
        [Validators.required],
      ],
      is_verified: [
        { value: true, disabled: !this.modify },
        [Validators.required],
      ],
      user_type: [
        { value: 'No Access', disabled: !this.modify },
        [Validators.required],
      ],
      companies: [
        { value: 'No Access', disabled: !this.modify },
        [Validators.required],
      ],
      forward_plans: [
        { value: 'No Access', disabled: !this.modify },
        [Validators.required],
      ],
      processes: [
        { value: 'No Access', disabled: !this.modify },
        [Validators.required],
      ],
      contracts: [
        { value: 'No Access', disabled: !this.modify },
        [Validators.required],
      ],
      purchase_orders: [
        { value: 'No Access', disabled: !this.modify },
        [Validators.required],
      ],
      tasks: [
        { value: 'No Access', disabled: !this.modify },
        [Validators.required],
      ],
      people: [
        { value: 'No Access', disabled: !this.modify },
        [Validators.required],
      ],
      system_params: [
        { value: 'No Access', disabled: !this.modify },
        [Validators.required],
      ],
      user_admin: [
        { value: 'No Access', disabled: !this.modify },
        [Validators.required],
      ],
    });
  }

  addRecord() {
    this.maintModal.show();
    this.editing = false;
    this.maintForm.get('email').enable();
    this.maintForm.patchValue({
      is_active: true,
    });
  }

  editRecord(record) {
    // this.isFetching = true;
    if (!this.no_access) {
      this.editing = true;
      this.getPeople();
      this.getTeams();
      this.id = record.id;
      this.maintForm.patchValue({
        email: record.email,
        person: record.person?.id,
        team: record?.team?.id,
        is_active: record.is_active,
        is_verified: record.is_verified,
        user_type: record.user_type,
        companies: record.companies,
        forward_plans: record.forward_plans,
        processes: record.processes,
        contracts: record.contracts,
        purchase_orders: record.purchase_orders,
        tasks: record.tasks,
        people: record.people,
        system_params: record.system_params,
        user_admin: record.user_admin,
      });
      this.maintForm.get('email').disable();
      this.maintModal.show();
    }
  }

  confirmDelete(record) {
    this.id = record.id;
    this.deleteModal.show();
  }
  deleteRecord() {
    this.userAccessService.delete(this.id).subscribe((result) => {
      this.getTableData(this.baseUrl);
    });
    this.deleteModal.hide();
  }

  saveRecord() {
    if (this.editing) {
      this.maintForm.get('email').enable();
      this.userAccessService
        .update(this.id, this.maintForm.value)
        .subscribe((result) => {
          this.getTableData(this.baseUrl);
        });
      this.editing = false;
    } else {
      this.userAccessService
        .create(this.maintForm.value)
        .subscribe((result) => {
          this.getTableData(this.baseUrl);
        });
    }
    this.id = undefined;
    this.maintForm.reset();
    this.maintModal.hide();
  }

  getTeams() {
    this.teams$ = this.teamService
      .getAll('api/system-parameter/team-list/')
      .pipe(map((team) => team.sort(sortAlpha)));
  }

  getPeople() {
    this.people$ = this.personService
      .getAll('api/people/people-list/')
      .pipe(map((people) => people.results));
  }

  closeModal() {
    this.maintForm.reset();
    this.maintModal.hide();
  }

  fieldChange(event: any) {
    this.searchField = event.target.value;
    if (this.searchField !== 'Select Field') {
      this.searchMessage = 'Search for';
      this.disableSearch = false;
    } else {
      this.searchMessage = 'Select field to search';
      this.disableSearch = true;
    }
  }
}
