import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ModalDirective } from 'ngx-bootstrap/modal';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ProcurementSubCategoryService } from '../../services/procurement-sub-category.service';
import { ProcurementCategoryService } from '../../services/procurement-category.service';
import { UserAccessService } from '../../services/user-access.service';

import {
  ProcurementSubCategory,
  sortAlphaSC,
} from '../../models/procurement-sub-category.model';
import {
  ProcurementCategory,
  sortAlpha,
} from '../../models/procurement-category.model';

@Component({
  selector: 'app-teams',
  templateUrl: './procurement-sub-categories.component.html',
  styleUrls: ['./procurement-sub-categories.component.css'],
})
export class ProcurementSubCategoriesComponent implements OnInit {
  tableData$: Observable<ProcurementSubCategory[]>;
  allData$: Observable<ProcurementSubCategory[]>;
  activeData$: Observable<ProcurementSubCategory[]>;
  inactiveData$: Observable<ProcurementSubCategory[]>;

  maintForm: FormGroup;
  baseUrl: string = 'api/system-parameter/procurement-sub-category-list/';
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

  activeOnly: string = 'All';

  isCurrent: boolean;
  inProgress: boolean;
  isActive: boolean;

  public procurementCategory$: Observable<ProcurementCategory[]>;

  // url = new URL(this.baseUrl);

  @ViewChild('maintModal', { static: false }) public maintModal: ModalDirective;
  @ViewChild('deleteModal', { static: false })
  public deleteModal: ModalDirective;
  // confirmDialogService: any;

  constructor(
    private fb: FormBuilder,
    private procurementSubCategoryService: ProcurementSubCategoryService,
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

      const procurementSubCategory$ = this.procurementSubCategoryService
        .getAll(apiUrl)
        .pipe(
          map((procurementSubCategory) =>
            procurementSubCategory.sort(sortAlphaSC)
          )
        );

      this.isFetching = false;
      // this.tableData$ = contractStatus$;

      this.allData$ = procurementSubCategory$;
      this.activeData$ = procurementSubCategory$.pipe(
        map((procurementSubCategories) =>
          procurementSubCategories.filter(
            (procurementSubCategory) =>
              procurementSubCategory.is_active === true
          )
        )
      );
      this.inactiveData$ = procurementSubCategory$.pipe(
        map((procurementSubCategories) =>
          procurementSubCategories.filter(
            (procurementSubCategory) =>
              procurementSubCategory.is_active === false
          )
        )
      );
      // this.tableData$ = this.allData$;
      this.filterOnActive();
    }
  }

  activeFilterToggle() {
    switch (this.activeOnly) {
      case 'All': {
        this.activeOnly = 'Active';
        break;
      }
      case 'Active': {
        this.activeOnly = 'Inactive';
        break;
      }
      case 'Inactive': {
        this.activeOnly = 'All';
        break;
      }
    }
    this.filterOnActive();
  }

  filterOnActive() {
    if (this.activeOnly === 'All') {
      this.tableData$ = this.allData$;
    } else if (this.activeOnly === 'Active') {
      this.tableData$ = this.activeData$;
    } else {
      this.tableData$ = this.inactiveData$;
    }
  }

  filterOnCurrent() {}

  applyFilter(filterValue: string) {
    // this.tableData$.filter = filterValue.trim().toLocaleLowerCase();
  }

  createForm() {
    this.maintForm = this.fb.group({
      procurement_sub_category: ['', [Validators.required]],
      procurement_category: [
        { value: '', disabled: !this.modify },
        [Validators.required],
      ],
      procurement_sub_category_description: ['', []],
      is_active: [
        { value: true, disabled: !this.modify },
        [Validators.required],
      ],
    });
  }

  addRecord() {
    this.maintModal.show();
    this.getProcurementCategory();
    this.maintForm.patchValue({
      is_active: true,
    });
  }

  editRecord(record) {
    if (!this.no_access) {
      this.editing = true;
      // this.isFetching = true;
      this.id = record.id;
      this.getProcurementCategory();
      this.maintForm.patchValue({
        procurement_sub_category: record.procurement_sub_category,
        procurement_category: record.procurement_category.id,
        procurement_sub_category_description:
          record.procurement_sub_category_description,
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
    this.procurementSubCategoryService.delete(this.id).subscribe((result) => {
      this.getTableData(this.baseUrl);
    });
    this.deleteModal.hide();
  }

  saveRecord() {
    if (this.editing) {
      this.procurementSubCategoryService
        .update(this.id, this.maintForm.value)
        .subscribe((result) => {
          this.getTableData(this.baseUrl);
        });
      this.editing = false;
    } else {
      this.procurementSubCategoryService
        .create(this.maintForm.value)
        .subscribe((result) => {
          this.getTableData(this.baseUrl);
        });
    }
    this.id = undefined;
    this.maintForm.reset();
    this.maintModal.hide();
  }

  getProcurementCategory() {
    this.procurementCategory$ = this.procurementCategoryService
      .getAll('api/system-parameter/procurement-category-list/')
      .pipe(map((procurementCategory) => procurementCategory.sort(sortAlpha)));
  }

  closeModal() {
    this.maintForm.reset();
    this.maintModal.hide();
  }
}
