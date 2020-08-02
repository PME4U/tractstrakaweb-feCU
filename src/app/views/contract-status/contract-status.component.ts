import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ModalDirective } from 'ngx-bootstrap/modal';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ContractStatusService } from '../../services/contract-status.service';
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
  maintForm: FormGroup;
  recordTitle: string;
  id = null;
  editing: boolean;
  isFetching: boolean = false;
  baseUrl: string = 'api/system-parameter/contract-status-list/';
  totalRecords: number;
  next: string;
  previous: string;
  usePagination: boolean = false;
  limit: number;
  offset: number;
  pages: any = [];
  page: number = 1;

  isCurrent: boolean;
  inProgress: boolean;
  isActive: boolean;

  @ViewChild('maintModal', { static: false }) public maintModal: ModalDirective;
  @ViewChild('deleteModal', { static: false })
  public deleteModal: ModalDirective;

  constructor(
    private fb: FormBuilder,
    private contractStatusService: ContractStatusService
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    this.getTableData(this.baseUrl);
  }

  getTableData(apiUrl: string) {
    this.isFetching = true;

    const contractStatus$ = this.contractStatusService
      .getAll(apiUrl)
      .pipe(map((contractStatus) => contractStatus.sort(sortStatusBySeqNo)));

    this.isFetching = false;
    this.tableData$ = contractStatus$;
  }

  createForm() {
    this.maintForm = this.fb.group({
      contract_status: ['', [Validators.required]],
      status_description: ['', [Validators.required]],
      status_sequence: [
        '',
        [Validators.required, Validators.pattern('^[0-9]*$')],
      ],
      in_progress: [false, [Validators.required]],
      is_current: [false, [Validators.required]],
      is_active: [true, [Validators.required]],
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
    this.editing = true;
    this.isFetching = true;
    this.contractStatusService.getOne(this.baseUrl, record.id).subscribe(
      (response) => {
        this.isFetching = false;

        this.id = response.id;
        this.isCurrent = response.is_current;
        this.inProgress = response.in_progress;
        this.isActive = response.is_active;

        this.maintForm.patchValue({
          contract_status: response.contract_status,
          status_description: response.status_description,
          status_sequence: response.status_sequence,
          in_progress: response.in_progress,
          is_current: response.is_current,
          is_active: response.is_active,
        });
        console.log(response);
        // console.log(this.tableData);
        // console.log('Total records:' + this.totalRecords);
        // console.log(this.next);
        // console.log(this.previous);
      },
      (error) => {
        alert(error.message);
      }
    );
    this.maintModal.show();
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
