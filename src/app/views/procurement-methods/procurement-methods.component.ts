import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ModalDirective } from 'ngx-bootstrap/modal';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ProcurementStrategyService } from '../../services/procurement-strategy.service';
import { UserAccessService } from '../../services/user-admin.service';
import { ProcurementMethodService } from '../../services/procurement-method.service';

import {
  ProcurementStrategy,
  sortAlphaPS,
} from '../../models/procurement-strategy.model';
import {
  ProcurementMethod,
  sortAlpha,
} from '../../models/procurement-method.model';

@Component({
  selector: 'app-teams',
  templateUrl: './procurement-methods.component.html',
  styleUrls: ['./procurement-methods.component.css'],
})
export class ProcurementMethodsComponent implements OnInit {
  tableData$: Observable<ProcurementMethod[]>;
  allData$: Observable<ProcurementMethod[]>;
  activeData$: Observable<ProcurementMethod[]>;
  inactiveData$: Observable<ProcurementMethod[]>;

  maintForm: FormGroup;
  baseUrl: string = 'api/system-parameter/procurement-method-list/';
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

  public procurementStrategies$: Observable<ProcurementStrategy[]>;

  // url = new URL(this.baseUrl);

  @ViewChild('maintModal', { static: false }) public maintModal: ModalDirective;
  @ViewChild('deleteModal', { static: false })
  public deleteModal: ModalDirective;
  // confirmDialogService: any;

  constructor(
    private fb: FormBuilder,
    private procurementMethodService: ProcurementMethodService,
    private procurementStrategyService: ProcurementStrategyService,
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

      const procurementMethod$ = this.procurementMethodService
        .getAll(apiUrl)
        .pipe(map((procurementMethod) => procurementMethod.sort(sortAlpha)));

      this.isFetching = false;
      // this.tableData$ = contractStatus$;

      this.allData$ = procurementMethod$;
      this.activeData$ = procurementMethod$.pipe(
        map((procurementMethods) =>
          procurementMethods.filter(
            (procurementMethod) => procurementMethod.is_active === true
          )
        )
      );
      this.inactiveData$ = procurementMethod$.pipe(
        map((procurementMethods) =>
          procurementMethods.filter(
            (procurementMethod) => procurementMethod.is_active === false
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
      procurement_strategy: ['', [Validators.required]],
      procurement_method: ['', [Validators.required]],
      method_description: ['', []],
      is_active: [
        { value: true, disabled: !this.modify },
        [Validators.required],
      ],
    });
  }

  addRecord() {
    this.maintModal.show();
    this.getProcurementStrategy();
    this.maintForm.patchValue({
      is_active: true,
    });
  }

  editRecord(record) {
    if (!this.no_access) {
      this.editing = true;
      // this.isFetching = true;
      this.getProcurementStrategy();
      this.id = record.id;
      this.maintForm.patchValue({
        procurement_strategy: record.procurement_strategy.id,
        procurement_method: record.procurement_method,
        method_description: record.method_description,
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
    this.procurementMethodService.delete(this.id).subscribe((result) => {
      this.getTableData(this.baseUrl);
    });
    this.deleteModal.hide();
  }

  saveRecord() {
    if (this.editing) {
      this.procurementMethodService
        .update(this.id, this.maintForm.value)
        .subscribe((result) => {
          this.getTableData(this.baseUrl);
        });
      this.editing = false;
    } else {
      this.procurementMethodService
        .create(this.maintForm.value)
        .subscribe((result) => {
          this.getTableData(this.baseUrl);
        });
    }
    this.id = undefined;
    this.maintForm.reset();
    this.maintModal.hide();
  }

  getProcurementStrategy() {
    this.procurementStrategies$ = this.procurementStrategyService
      .getAll('api/system-parameter/procurement-strategy-list/')
      .pipe(
        map((procurementStrategy) => procurementStrategy.sort(sortAlphaPS))
      );
  }

  closeModal() {
    this.maintForm.reset();
    this.maintModal.hide();
  }
}
