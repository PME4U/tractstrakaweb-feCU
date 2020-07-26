import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ModalDirective } from 'ngx-bootstrap/modal';

import { ContractStatusService } from '../../services/contract-status.service';

@Component({
  selector: 'app-contract-status',
  templateUrl: './contract-status.component.html',
  styleUrls: ['./contract-status.component.css'],
})
export class ContractStatusComponent implements OnInit {
  tableData: any = [];
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

  // url = new URL(this.baseUrl);

  @ViewChild('maintModal', { static: false }) public maintModal: ModalDirective;
  @ViewChild('deleteModal', { static: false })
  public deleteModal: ModalDirective;
  // confirmDialogService: any;

  constructor(
    private fb: FormBuilder,
    private contractStatusService: ContractStatusService
  ) {
    this.tableData = new Array<any>();
    this.createForm();
  }

  ngOnInit(): void {
    this.getTableData(this.baseUrl);
  }

  getTableData(apiUrl: string) {
    // let splitUrl: any = [];

    this.isFetching = true;

    this.contractStatusService.getAll(apiUrl).subscribe(
      (response) => {
        this.isFetching = false;
        this.tableData = response;
        this.totalRecords = response.count;

        // this.pages = Math.ceil(this.totalRecords / this.limit);

        // console.log('pages:' + this.pages);

        // if (response.next) {
        //   splitUrl = response.next.split('4200');
        //   this.next = splitUrl[1];
        //   })
        // } else {
        //   this.next = undefined;
        // }

        // if (response.previous) {
        //   splitUrl = response.previous.split('4200');
        //   this.previous = splitUrl[1];
        // } else {
        //   this.previous = undefined;
        // }

        // if (this.totalRecords > 5) {
        //   this.usePagination = true;
        // }
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
  }

  // fecthNext() {
  //   // console.log(this.next);
  //   this.getTableData(this.next);
  // }

  // fecthPrevious() {
  //   this.getTableData(this.previous);
  // }

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
