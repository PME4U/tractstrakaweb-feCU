import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ModalDirective } from 'ngx-bootstrap/modal';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ContractStatusService } from '../../services/contract-status.service';
import { UserAccessService } from '../../services/user-admin.service';

import {
  ContractStatus,
  sortStatusBySeqNo,
} from '../../models/contract-status.model';

@Component({
  selector: 'app-contract-status',
  templateUrl: './contract-status.component.html',
  styleUrls: ['./contract-status.component.css'],
})
export class ContractStatusComponent implements OnInit {
  tableData$: Observable<ContractStatus[]>;
  allData$: Observable<ContractStatus[]>;
  activeData$: Observable<ContractStatus[]>;
  inactiveData$: Observable<ContractStatus[]>;

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
  baseUrl: string = 'api/system-parameter/contract-status-list/';
  // totalRecords: number;
  // next: string;
  // previous: string;
  // usePagination: boolean = false;
  // limit: number;
  // offset: number;
  // pages: any = [];
  // page: number = 1;

  activeOnly: string = 'All';

  isCurrent: boolean;
  inProgress: boolean;
  isActive: boolean;

  @ViewChild('maintModal', { static: false }) public maintModal: ModalDirective;
  @ViewChild('deleteModal', { static: false })
  public deleteModal: ModalDirective;

  constructor(
    private fb: FormBuilder,
    private contractStatusService: ContractStatusService,
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

      const contractStatus$ = this.contractStatusService
        .getAll(apiUrl)
        .pipe(map((contractStatus) => contractStatus.sort(sortStatusBySeqNo)));

      this.isFetching = false;
      // this.tableData$ = contractStatus$;

      this.allData$ = contractStatus$;
      this.activeData$ = contractStatus$.pipe(
        map((contractStatuses) =>
          contractStatuses.filter(
            (contractStatus) => contractStatus.is_active === true
          )
        )
      );
      this.inactiveData$ = contractStatus$.pipe(
        map((contractStatuses) =>
          contractStatuses.filter(
            (contractStatus) => contractStatus.is_active === false
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
      contract_status: ['', [Validators.required]],
      status_description: ['', [Validators.required]],
      status_sequence: [
        '',
        [Validators.required, Validators.pattern('^[0-9]*$')],
      ],
      in_progress: [
        { value: false, disabled: !this.modify },
        [Validators.required],
      ],
      is_current: [
        { value: false, disabled: !this.modify },
        [Validators.required],
      ],
      is_active: [
        { value: true, disabled: !this.modify },
        [Validators.required],
      ],
    });
  }

  addRecord() {
    this.maintModal.show();
    this.maintForm.patchValue({
      in_progress: false,
      is_current: false,
      is_active: true,
    });
  }

  editRecord(record) {
    if (!this.no_access) {
      this.editing = true;
      this.id = record.id;
      // this.isFetching = true;
      this.maintForm.patchValue({
        contract_status: record.contract_status,
        status_description: record.status_description,
        status_sequence: record.status_sequence,
        in_progress: record.in_progress,
        is_current: record.is_current,
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
    this.contractStatusService.delete(this.id).subscribe((result) => {
      this.getTableData(this.baseUrl);
    });
    this.deleteModal.hide();
  }

  saveRecord() {
    if (this.editing) {
      console.log(JSON.stringify(this.maintForm.value));
      this.contractStatusService
        .update(this.id, this.maintForm.value)
        .subscribe((result) => {
          this.getTableData(this.baseUrl);
        });
      this.editing = false;
    } else {
      this.contractStatusService
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
