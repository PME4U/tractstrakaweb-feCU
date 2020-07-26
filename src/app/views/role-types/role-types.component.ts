import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ModalDirective } from 'ngx-bootstrap/modal';

import { RoleTypeService } from '../../services/role-type.service';

@Component({
  selector: 'app-role-types',
  templateUrl: './role-types.component.html',
  styleUrls: ['./role-types.component.css'],
})
export class RoleTypesComponent implements OnInit {
  tableData: any = [];
  maintForm: FormGroup;
  recordTitle: string;
  id = null;
  editing: boolean;
  isFetching: boolean = false;
  baseUrl: string = 'api/system-parameter/role-type-list/';
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
    private roleTypeService: RoleTypeService
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

    this.roleTypeService.getAll(apiUrl).subscribe(
      (response) => {
        this.isFetching = false;
        this.tableData = response;
        this.totalRecords = response.count;

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

  createForm() {
    this.maintForm = this.fb.group({
      role_in_process: ['', [Validators.required]],
      used_in_forward_plans: [false, [Validators.required]],
      used_in_invitation_processes: [false, [Validators.required]],
      used_in_contracts: [false, [Validators.required]],
      is_active: [true, [Validators.required]],
    });
  }

  addRecord() {
    this.maintModal.show();
    this.maintForm.patchValue({
      used_in_forward_plans: false,
      used_in_invitation_processes: false,
      used_in_contracts: false,
      is_active: true,
    });
  }

  editRecord(record) {
    this.editing = true;
    this.isFetching = true;
    this.roleTypeService.getOne(this.baseUrl, record.id).subscribe(
      (response) => {
        this.isFetching = false;

        this.id = response.id;
        this.isActive = response.is_active;

        this.maintForm.patchValue({
          role_in_process: response.role_in_process,
          used_in_forward_plans: response.used_in_forward_plans,
          used_in_invitation_processes: response.used_in_invitation_processes,
          used_in_contracts: response.used_in_contracts,
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
    this.roleTypeService.delete(this.id).subscribe((result) => {
      this.getTableData(this.baseUrl);
    });
    this.deleteModal.hide();
  }

  saveRecord() {
    if (this.editing) {
      this.roleTypeService
        .update(this.id, this.maintForm.value)
        .subscribe((result) => {
          this.getTableData(this.baseUrl);
        });
      this.editing = false;
    } else {
      this.roleTypeService.create(this.maintForm.value).subscribe((result) => {
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
