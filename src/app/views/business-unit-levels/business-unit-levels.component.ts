import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ModalDirective } from 'ngx-bootstrap/modal';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BusinessUnitLevelService } from '../../services/business-unit-level.service';
import { UserAccessService } from '../../services/user-admin.service';

import {
  BusinessUnitLevel,
  sortAlpha,
} from '../../models/business-unit-level.model';

@Component({
  selector: 'app-business-unit-levels',
  templateUrl: './business-unit-levels.component.html',
  styleUrls: ['./business-unit-levels.component.css'],
})
export class BusinessUnitLevelsComponent implements OnInit {
  tableData$: Observable<BusinessUnitLevel[]>;
  allData$: Observable<BusinessUnitLevel[]>;
  activeData$: Observable<BusinessUnitLevel[]>;
  inactiveData$: Observable<BusinessUnitLevel[]>;

  maintForm: FormGroup;
  baseUrl: string = 'api/system-parameter/business-unit-level-list/';
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
    private businessUnitLevelService: BusinessUnitLevelService,
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

    // console.log('no_access rights:' + this.no_access);
    // console.log('read_only rights:' + this.read_only);
    // console.log('modify rights:' + this.modify);
    // console.log('create rights:' + this.create);
    // console.log('isDelete rights:' + this.delete);
  }

  getTableData(apiUrl: string) {
    // console.log('Get Table Rights: ' + this.no_access);
    if (!this.no_access) {
      this.isFetching = true;
      const team$ = this.businessUnitLevelService
        .getAll(apiUrl)
        .pipe(map((businessUnitLevel) => businessUnitLevel.sort(sortAlpha)));

      this.isFetching = false;
      // this.tableData$ = contractStatus$;

      this.allData$ = team$;
      this.activeData$ = team$.pipe(
        map((businessUnitLevels) =>
          businessUnitLevels.filter(
            (businessUnitLevel) => businessUnitLevel.is_active === true
          )
        )
      );
      this.inactiveData$ = team$.pipe(
        map((businessUnitLevels) =>
          businessUnitLevels.filter(
            (businessUnitLevel) => businessUnitLevel.is_active === false
          )
        )
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
    // this.read_only = this.userAccessService.isReadOnly(this.rights);
    // console.log('Cerate Rights: ' + this.create);
    this.maintForm = this.fb.group({
      business_unit_level: ['', [Validators.required]],
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
      this.id = record.id;
      this.maintForm.patchValue({
        business_unit_level: record.business_unit_level,
        is_active: record.is_active,
      });
      this.maintModal.show();
    } else {
      window.alert('You do not have access to this function');
    }
  }

  confirmDelete(record) {
    this.id = record.id;
    this.deleteModal.show();
  }
  deleteRecord() {
    this.businessUnitLevelService.delete(this.id).subscribe((result) => {
      this.getTableData(this.baseUrl);
    });
    this.deleteModal.hide();
  }

  saveRecord() {
    if (this.editing) {
      this.businessUnitLevelService
        .update(this.id, this.maintForm.value)
        .subscribe((result) => {
          this.getTableData(this.baseUrl);
        });
      this.editing = false;
    } else {
      this.businessUnitLevelService
        .create(this.maintForm.value)
        .subscribe((result) => {
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
