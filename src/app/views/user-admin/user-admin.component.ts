import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ModalDirective } from 'ngx-bootstrap/modal';

import {
  UserAccessService,
  TableData,
} from '../../services/user-admin.service';
import { UserAccessModel } from '../../models/user-access.model';
import { ɵEmptyOutletComponent } from '@angular/router';

@Component({
  selector: 'app-contract-type',
  templateUrl: './user-admin.component.html',
  styleUrls: ['./user-admin.component.scss'],
})
export class UserAdminComponent implements OnInit {
  userAccessModels: UserAccessModel[];
  error: any;
  maintForm: FormGroup;
  recordTitle: string;
  id = null;
  editing: boolean;
  isFetching: boolean = false;
  baseUrl: string = 'api/account/account-access-list/';
  totalRecords: number;
  isActive: boolean;
  searchField: string;
  public disableSearch = true;
  public searchMessage = 'Select field to search';
  public data: TableData;
  public filterQuery = '';

  @ViewChild('maintModal', { static: false }) public maintModal: ModalDirective;
  @ViewChild('deleteModal', { static: false })
  public deleteModal: ModalDirective;

  constructor(
    private fb: FormBuilder,
    private userAccessService: UserAccessService
  ) {
    this.data = new Array<any>();
    this.createForm();
  }

  ngOnInit(): void {
    this.getTableData(this.baseUrl);
  }

  // public toInt(num: string) {
  //   return +num;
  // }

  // public sortByWordLength = (a: any) => {
  //   return a.email.length;
  // };

  getTableData(apiUrl: string) {
    this.isFetching = true;

    this.userAccessService.getAll(apiUrl).subscribe(
      (data: TableData) => {
        this.isFetching = false;
        setTimeout(() => {
          this.data = [...data];
        }, 1000);
      }, // success path
      (error) => (this.error = error) // error path
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
    this.editing = false;
    this.maintForm.get('email').enable();
    this.maintForm.patchValue({
      is_active: true,
    });
  }

  editRecord(record) {
    this.isFetching = true;
    this.editing = true;
    this.maintForm.get('email').disable();
    this.userAccessService.getOne(this.baseUrl, record.id).subscribe(
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
    this.userAccessService.delete(this.id).subscribe((result) => {
      this.getTableData(this.baseUrl);
    });
    this.deleteModal.hide();
  }

  saveRecord() {
    if (this.editing) {
      this.maintForm.get('email').enable();
      this.userAccessService
        .update(this.id, this.maintForm.value)
        .subscribe((result) => {
          this.getTableData(this.baseUrl);
        });
      this.editing = false;
    } else {
      this.userAccessService
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

  fieldChange(event: any) {
    this.searchField = event.target.value;
    if (this.searchField !== 'Select Field') {
      this.searchMessage = 'Search for';
      this.disableSearch = false;
    } else {
      this.searchMessage = 'Select field to search';
      this.disableSearch = true;
    }
  }
}
