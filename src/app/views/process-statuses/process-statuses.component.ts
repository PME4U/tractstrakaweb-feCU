import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ModalDirective } from 'ngx-bootstrap/modal';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ProcessStatusService } from '../../services/process-status.service';
import { UserAccessService } from '../../services/user-admin.service';

import {
  ProcessStatus,
  sortStatusBySeqNo,
} from '../../models/process-status.model';

@Component({
  selector: 'app-process-statuses',
  templateUrl: './process-statuses.component.html',
  styleUrls: ['./process-statuses.component.css'],
})
export class ProcessStatusesComponent implements OnInit {
  tableData$: Observable<ProcessStatus[]>;

  maintForm: FormGroup;
  baseUrl: string = 'api/system-parameter/process-status-list/';
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
    private processStatusService: ProcessStatusService,
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
      const processStatus$ = this.processStatusService
        .getAll(apiUrl)
        .pipe(map((processStatus) => processStatus.sort(sortStatusBySeqNo)));

      this.isFetching = false;
      this.tableData$ = processStatus$;
    }
  }

  createForm() {
    this.maintForm = this.fb.group({
      process_status: ['', [Validators.required]],
      status_description: ['', [Validators.required]],
      process_sequence: ['', [Validators.required]],
      in_progress: [
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
      is_active: true,
    });
  }

  editRecord(record) {
    if (!this.no_access) {
      this.editing = true;
      this.id = record.id;
      // this.isFetching = true;
      this.maintForm.patchValue({
        process_status: record.process_status,
        status_description: record.status_description,
        process_sequence: record.process_sequence,
        in_progress: record.in_progress,
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
    this.processStatusService.delete(this.id).subscribe((result) => {
      this.getTableData(this.baseUrl);
    });
    this.deleteModal.hide();
  }

  saveRecord() {
    if (this.editing) {
      this.processStatusService
        .update(this.id, this.maintForm.value)
        .subscribe((result) => {
          this.getTableData(this.baseUrl);
        });
      this.editing = false;
    } else {
      console.log(this.maintForm.value);
      this.processStatusService
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
