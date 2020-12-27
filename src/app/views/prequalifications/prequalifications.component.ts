import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ModalDirective } from 'ngx-bootstrap/modal';

import { PrequalificationService } from '../../services/prequalification.service';
import { UserAccessService } from '../../services/user-admin.service';

@Component({
  selector: 'app-prequalifications',
  templateUrl: './prequalifications.component.html',
  styleUrls: ['./prequalifications.component.css'],
})
export class PrequalificationsComponent implements OnInit {
  tableData: any = [];
  maintForm: FormGroup;
  baseUrl: string = 'api/system-parameter/prequalification-list/';
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
    private prequalificationService: PrequalificationService,
    private userAccessService: UserAccessService
  ) {
    // this.tableData = new Array<any>();
  }

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
    // let splitUrl: any = [];
    if (!this.no_access) {
      this.isFetching = true;

      this.prequalificationService.getAll(apiUrl).subscribe(
        (response) => {
          this.isFetching = false;
          this.tableData = response;
          this.totalRecords = response.count;

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
  }

  createForm() {
    this.maintForm = this.fb.group({
      prequalification: ['', [Validators.required]],
      prequalification_code: ['', [Validators.required]],
      prequalification_description: ['', [Validators.required]],
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
        prequalification: record.prequalification,
        prequalification_code: record.prequalification_code,
        prequalification_description: record.prequalification_description,
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
    this.prequalificationService.delete(this.id).subscribe((result) => {
      this.getTableData(this.baseUrl);
    });
    this.deleteModal.hide();
  }

  saveRecord() {
    if (this.editing) {
      this.prequalificationService
        .update(this.id, this.maintForm.value)
        .subscribe((result) => {
          this.getTableData(this.baseUrl);
        });
      this.editing = false;
    } else {
      this.prequalificationService
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
