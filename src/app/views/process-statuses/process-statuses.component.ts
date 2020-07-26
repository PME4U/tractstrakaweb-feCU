import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ModalDirective } from 'ngx-bootstrap/modal';

import { Observable } from 'rxjs';

import { ProcessStatusService } from '../../services/process-status.service';
import { ProcessStatusModel } from '../../models/process-status.model';

@Component({
  selector: 'app-process-statuses',
  templateUrl: './process-statuses.component.html',
  styleUrls: ['./process-statuses.component.css'],
})
export class ProcessStatusesComponent implements OnInit {
  tableData: any = [];
  maintForm: FormGroup;
  recordTitle: string;
  id = null;
  editing: boolean;
  isFetching: boolean = false;
  baseUrl: string = 'api/system-parameter/process-status-list/';
  totalRecords: number;
  isActive: boolean;
  inProgress: boolean;

  @ViewChild('maintModal', { static: false }) public maintModal: ModalDirective;
  @ViewChild('deleteModal', { static: false })
  public deleteModal: ModalDirective;

  constructor(
    private fb: FormBuilder,
    private processStatusService: ProcessStatusService
  ) {
    this.tableData = new Array<any>();
    this.createForm();
  }

  ngOnInit(): void {
    this.getTableData(this.baseUrl);
  }

  getTableData(apiUrl: string) {
    this.isFetching = true;

    this.processStatusService.getAll(apiUrl).subscribe(
      (response: ProcessStatusModel[]) => {
        this.isFetching = false;
        this.tableData = response;

        // console.log(response);
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

  createForm() {
    this.maintForm = this.fb.group({
      process_status: ['', [Validators.required]],
      status_description: ['', [Validators.required]],
      process_sequence: ['', [Validators.required]],
      in_progress: [false, [Validators.required]],
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
    this.processStatusService.getOne(this.baseUrl, record.id).subscribe(
      (response) => {
        this.isFetching = false;

        this.id = response.id;
        this.inProgress = response.in_progress;
        this.isActive = response.is_active;

        this.maintForm.patchValue({
          process_status: response.process_status,
          status_description: response.status_description,
          process_sequence: response.process_sequence,
          in_progress: response.in_progress,
          is_active: response.is_active,
        });
        // console.log(response);
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
