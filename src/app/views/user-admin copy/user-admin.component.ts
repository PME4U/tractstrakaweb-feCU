import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ModalDirective } from 'ngx-bootstrap/modal';

import { Observable } from 'rxjs';

import { UserAccessService } from '../../services/user-admin.service';
import { UserAccessModel } from '../../models/user-access.model';

@Component({
  selector: 'app-contract-type',
  templateUrl: './user-admin.component.html',
  styleUrls: ['./user-admin.component.css'],
})
export class UserAdminComponent implements OnInit {
  tableData: any = [];
  maintForm: FormGroup;
  recordTitle: string;
  id = null;
  editing: boolean;
  isFetching: boolean = false;
  baseUrl: string = 'api/account/account-access-list/';
  totalRecords: number;
  isActive: boolean;

  @ViewChild('maintModal', { static: false }) public maintModal: ModalDirective;
  @ViewChild('deleteModal', { static: false })
  public deleteModal: ModalDirective;

  constructor(
    private fb: FormBuilder,
    private userAccessService: UserAccessService
  ) {
    this.tableData = new Array<any>();
    this.createForm();
  }

  ngOnInit(): void {
    this.getTableData(this.baseUrl);
  }

  getTableData(apiUrl: string) {
    this.isFetching = true;

    this.userAccessService.getUserAccesses(apiUrl).subscribe(
      (response: UserAccessModel[]) => {
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
      email: ['', [Validators.required, Validators.email]],
      is_active: [true, [Validators.required]],
      user_type: ['No Access', [Validators.required]],
      companies: ['No Access', [Validators.required]],
      forward_plans: ['No Access', [Validators.required]],
      processes: ['No Access', [Validators.required]],
      contracts: ['No Access', [Validators.required]],
      purchase_orders: ['No Access', [Validators.required]],
      tasks: ['No Access', [Validators.required]],
      people: ['No Access', [Validators.required]],
      system_params: ['No Access', [Validators.required]],
      user_admin: ['No Access', [Validators.required]],
    });
  }

  addRecord() {
    this.maintModal.show();
    this.maintForm.patchValue({
      is_active: true,
    });
  }

  editRecord(record) {
    this.editing = true;
    this.isFetching = true;
    this.userAccessService.getUserAccess(this.baseUrl, record.id).subscribe(
      (response) => {
        this.isFetching = false;

        this.id = response.id;
        this.isActive = response.is_active;

        this.maintForm.patchValue({
          email: response.email,
          is_active: response.is_active,
          user_type: response.user_type,
          companies: response.companies,
          forward_plans: response.forward_plans,
          processes: response.processes,
          contracts: response.contracts,
          purchase_orders: response.purchase_orders,
          tasks: response.tasks,
          people: response.people,
          system_params: response.system_params,
          user_admin: response.user_admin,
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
    this.userAccessService.deleteUserAccess(this.id).subscribe((result) => {
      this.getTableData(this.baseUrl);
    });
    this.deleteModal.hide();
  }

  saveRecord() {
    if (this.editing) {
      console.log(this.maintForm.value);
      this.userAccessService
        .updateUserAccess(this.id, this.maintForm.value)
        .subscribe((result) => {
          this.getTableData(this.baseUrl);
        });
      this.editing = false;
    } else {
      this.userAccessService
        .createUserAccess(this.maintForm.value)
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
