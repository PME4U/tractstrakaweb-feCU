import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ModalDirective } from 'ngx-bootstrap/modal';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BusinessUnitLevelService } from '../../services/business-unit-level.service';
import { BusinessUnitService } from '../../services/business-unit.service';
import { UserAccessService } from '../../services/user-admin.service';

import { BusinessUnit, sortAlphaBU } from '../../models/business-unit.model';
import {
  BusinessUnitLevel,
  sortAlpha,
} from '../../models/business-unit-level.model';

@Component({
  selector: 'app-business-unit',
  templateUrl: './business-units.component.html',
  styleUrls: ['./business-units.component.css'],
})
export class BusinessUnitsComponent implements OnInit {
  tableData$: Observable<BusinessUnit[]>;
  allData$: Observable<BusinessUnit[]>;
  activeData$: Observable<BusinessUnit[]>;
  inactiveData$: Observable<BusinessUnit[]>;

  maintForm: FormGroup;

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
  baseUrl: string = 'api/system-parameter/business-unit-list/';

  activeOnly: string = 'All';

  isCurrent: boolean;
  inProgress: boolean;
  isActive: boolean;

  public businessUnitLevels$: Observable<BusinessUnitLevel[]>;
  public parentBusinessUnits$: Observable<BusinessUnit[]>;

  // url = new URL(this.baseUrl);

  @ViewChild('maintModal', { static: false }) public maintModal: ModalDirective;
  @ViewChild('deleteModal', { static: false })
  public deleteModal: ModalDirective;
  // confirmDialogService: any;

  constructor(
    private fb: FormBuilder,
    private businessUnitService: BusinessUnitService,
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
  }

  getTableData(apiUrl: string) {
    this.isFetching = true;

    if (!this.no_access) {
      const businessUnits$ = this.businessUnitService
        .getAll(apiUrl)
        .pipe(map((businessUnit) => businessUnit.sort(sortAlphaBU)));

      this.isFetching = false;
      // this.tableData$ = contractStatus$;

      this.allData$ = businessUnits$;
      this.activeData$ = businessUnits$.pipe(
        map((business_units) =>
          business_units.filter(
            (business_unit) => business_unit.is_active === true
          )
        )
      );
      this.inactiveData$ = businessUnits$.pipe(
        map((business_units) =>
          business_units.filter(
            (business_unit) => business_unit.is_active === false
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
    this.maintForm = this.fb.group({
      business_unit_name: ['', [Validators.required]],
      business_unit_level: [
        { value: '', disabled: !this.modify },
        [Validators.required],
      ],
      parent_business_unit: [{ value: '', disabled: !this.modify }, []],
      business_unit_description: ['', []],
      is_active: [
        { value: true, disabled: !this.modify },
        [Validators.required],
      ],
    });
  }

  addRecord() {
    this.maintModal.show();
    this.getBusinessUnitLevels();
    this.getParentBusinessUnits();
    this.maintForm.patchValue({
      is_active: true,
    });
  }

  editRecord(record) {
    if (!this.no_access) {
      this.editing = true;
      this.getBusinessUnitLevels();
      this.getParentBusinessUnits();
      this.id = record.id;
      this.maintForm.patchValue({
        business_unit_name: record.business_unit_name,
        business_unit_level: record.business_unit_level?.id,
        parent_business_unit: record.parent_business_unit?.id,
        business_unit_description: record.business_unit_description,
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
    this.businessUnitService.delete(this.id).subscribe((result) => {
      this.getTableData(this.baseUrl);
    });
    this.deleteModal.hide();
  }

  saveRecord() {
    if (this.editing) {
      this.businessUnitService
        .update(this.id, this.maintForm.value)
        .subscribe((result) => {
          this.getTableData(this.baseUrl);
        });
      this.editing = false;
    } else {
      this.businessUnitService
        .create(this.maintForm.value)
        .subscribe((result) => {
          this.getTableData(this.baseUrl);
        });
    }
    this.id = undefined;
    this.maintForm.reset();
    this.maintModal.hide();
  }

  getBusinessUnitLevels() {
    this.businessUnitLevels$ = this.businessUnitLevelService
      .getAll('api/system-parameter/business-unit-level-list/')
      .pipe(map((businessUnitLevel) => businessUnitLevel.sort(sortAlpha)));
  }

  getParentBusinessUnits() {
    this.parentBusinessUnits$ = this.businessUnitService
      .getAll('api/system-parameter/business-unit-list/')
      .pipe(map((businessUnit) => businessUnit.sort(sortAlphaBU)));
  }

  closeModal() {
    this.maintForm.reset();
    this.maintModal.hide();
  }
}
