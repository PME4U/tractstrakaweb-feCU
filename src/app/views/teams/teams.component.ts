import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ModalDirective } from 'ngx-bootstrap/modal';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { TeamService } from '../../services/team.service';
import { UserAccessService } from '../../services/user-access.service';

import { Team, sortAlpha } from '../../models/team.model';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css'],
})
export class TeamsComponent implements OnInit {
  tableData$: Observable<Team[]>;
  allData$: Observable<Team[]>;
  activeData$: Observable<Team[]>;
  inactiveData$: Observable<Team[]>;

  maintForm: FormGroup;
  baseUrl: string = 'api/system-parameter/team-list/';
  scope = 'system_params';

  no_access: boolean = true;
  read_only: boolean = false;
  modify: boolean = false;
  create: boolean = false;
  delete: boolean = false;

  recordTitle: string;
  id = null;
  editing: boolean;
  isFetching: boolean = false;

  activeOnly: string = 'All';

  isCurrent: boolean;
  inProgress: boolean;
  isActive: boolean;

  // url = new URL(this.baseUrl);

  @ViewChild('maintModal', { static: false }) public maintModal: ModalDirective;
  @ViewChild('deleteModal', { static: false })
  public deleteModal: ModalDirective;
  // confirmDialogService: any;

  constructor(
    private fb: FormBuilder,
    private teamService: TeamService,
    private userAccessService: UserAccessService
  ) {}

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

      const team$ = this.teamService
        .getAll(apiUrl)
        .pipe(map((team) => team.sort(sortAlpha)));

      this.isFetching = false;
      // this.tableData$ = contractStatus$;

      this.allData$ = team$;
      this.activeData$ = team$.pipe(
        map((teams) => teams.filter((team) => team.is_active === true))
      );
      this.inactiveData$ = team$.pipe(
        map((teams) => teams.filter((team) => team.is_active === false))
      );
      // this.tableData$ = this.allData$;
      this.filterOnActive();
    }
  }

  activeFilterToggle() {
    switch (this.activeOnly) {
      case 'All': {
        this.activeOnly = 'Active';
        break;
      }
      case 'Active': {
        this.activeOnly = 'Inactive';
        break;
      }
      case 'Inactive': {
        this.activeOnly = 'All';
        break;
      }
    }
    this.filterOnActive();
  }

  filterOnActive() {
    if (this.activeOnly === 'All') {
      this.tableData$ = this.allData$;
    } else if (this.activeOnly === 'Active') {
      this.tableData$ = this.activeData$;
    } else {
      this.tableData$ = this.inactiveData$;
    }
  }

  filterOnCurrent() {}

  applyFilter(filterValue: string) {
    // this.tableData$.filter = filterValue.trim().toLocaleLowerCase();
  }

  createForm() {
    this.maintForm = this.fb.group({
      team: ['', [Validators.required]],
      description: ['', []],
      is_active: [
        { value: true, disabled: !this.modify },
        [Validators.required],
      ],
    });
  }

  addRecord() {
    this.maintModal.show();
    this.maintForm.patchValue({
      is_active: true,
    });
  }

  editRecord(record) {
    if (!this.no_access) {
      this.editing = true;
      // this.isFetching = true;
      this.id = record.id;
      this.maintForm.patchValue({
        team: record.team,
        description: record.description,
        is_active: record.is_active,
      });
      this.maintModal.show();
    }
  }

  confirmDelete(record) {
    this.id = record.id;
    this.deleteModal.show();
  }
  deleteRecord() {
    this.teamService.delete(this.id).subscribe((result) => {
      this.getTableData(this.baseUrl);
    });
    this.deleteModal.hide();
  }

  saveRecord() {
    if (this.editing) {
      this.teamService
        .update(this.id, this.maintForm.value)
        .subscribe((result) => {
          this.getTableData(this.baseUrl);
        });
      this.editing = false;
    } else {
      this.teamService.create(this.maintForm.value).subscribe((result) => {
        this.getTableData(this.baseUrl);
      });
    }
    this.id = undefined;
    this.maintForm.reset();
    this.maintModal.hide();
  }

  closeModal() {
    this.maintForm.reset();
    this.maintModal.hide();
  }
}
