import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ModalDirective } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ProcurementStrategyService } from '../../services/procurement-strategy.service';
import { UserAccessService } from '../../services/user-access.service';

import {
  ProcurementStrategy,
  sortAlphaPS,
} from '../../models/procurement-strategy.model';

@Component({
  selector: 'app-procurement-strategies',
  templateUrl: './procurement-strategies.component.html',
  styleUrls: ['./procurement-strategies.component.css'],
})
export class ProcurementStrategiesComponent implements OnInit {
  tableData$: Observable<ProcurementStrategy[]>;
  maintForm: FormGroup;
  baseUrl: string = 'api/system-parameter/procurement-strategy-list/';
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
  totalRecords: number;
  isActive: boolean;
  inProgress: boolean;

  @ViewChild('maintModal', { static: false }) public maintModal: ModalDirective;
  @ViewChild('deleteModal', { static: false })
  public deleteModal: ModalDirective;

  constructor(
    private fb: FormBuilder,
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

      // const processStatus$ = this.processStatusService.getAll(apiUrl)
      const procurementStrategy$ = this.procurementStrategyService
        .getAll(apiUrl)
        .pipe(
          map((procurementStrategy) => procurementStrategy.sort(sortAlphaPS))
        );

      this.isFetching = false;
      this.tableData$ = procurementStrategy$;
    }
  }

  createForm() {
    this.maintForm = this.fb.group({
      procurement_strategy: ['', [Validators.required]],
      stratgey_description: ['', [Validators.required]],
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
        procurement_strategy: record.procurement_strategy,
        stratgey_description: record.stratgey_description,
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
    this.procurementStrategyService.delete(this.id).subscribe((result) => {
      this.getTableData(this.baseUrl);
    });
    this.deleteModal.hide();
  }

  saveRecord() {
    if (this.editing) {
      this.procurementStrategyService
        .update(this.id, this.maintForm.value)
        .subscribe((result) => {
          this.getTableData(this.baseUrl);
        });
      this.editing = false;
    } else {
      console.log(this.maintForm.value);
      this.procurementStrategyService
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
