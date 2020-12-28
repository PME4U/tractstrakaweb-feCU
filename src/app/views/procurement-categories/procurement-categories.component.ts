import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ModalDirective } from 'ngx-bootstrap/modal';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ProcurementCategoryService } from '../../services/procurement-category.service';
import { UserAccessService } from '../../services/user-admin.service';

import {
  ProcurementCategory,
  sortAlpha,
} from '../../models/procurement-category.model';

@Component({
  selector: 'app-procurement-categories',
  templateUrl: './procurement-categories.component.html',
  styleUrls: ['./procurement-categories.component.css'],
})
export class ProcurementCategoriesComponent implements OnInit {
  tableData$: Observable<ProcurementCategory[]>;
  maintForm: FormGroup;
  baseUrl: string = 'api/system-parameter/procurement-category-list/';
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
    private procurementCategoryService: ProcurementCategoryService,
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
      const procurementStrategy$ = this.procurementCategoryService
        .getAll(apiUrl)
        .pipe(
          map((procurementCategory) => procurementCategory.sort(sortAlpha))
        );

      this.isFetching = false;
      this.tableData$ = procurementStrategy$;
    }
  }

  createForm() {
    this.maintForm = this.fb.group({
      procurement_category: ['', [Validators.required]],
      procurement_category_description: ['', []],
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
        procurement_category: record.procurement_category,
        procurement_category_description:
          record.procurement_category_description,
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
    this.procurementCategoryService.delete(this.id).subscribe((result) => {
      this.getTableData(this.baseUrl);
    });
    this.deleteModal.hide();
  }

  saveRecord() {
    if (this.editing) {
      this.procurementCategoryService
        .update(this.id, this.maintForm.value)
        .subscribe((result) => {
          this.getTableData(this.baseUrl);
        });
      this.editing = false;
    } else {
      console.log(this.maintForm.value);
      this.procurementCategoryService
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
