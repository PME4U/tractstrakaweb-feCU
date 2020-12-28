import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ModalDirective } from 'ngx-bootstrap/modal';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ProductGroupService } from '../../services/product-group.service';
import { UserAccessService } from '../../services/user-admin.service';

import { ProductGroup, sortAlphaPG } from '../../models/product-group.model';

@Component({
  selector: 'app-teams',
  templateUrl: './product-groups.component.html',
  styleUrls: ['./product-groups.component.css'],
})
export class ProductGroupsComponent implements OnInit {
  tableData$: Observable<ProductGroup[]>;
  allData$: Observable<ProductGroup[]>;
  activeData$: Observable<ProductGroup[]>;
  inactiveData$: Observable<ProductGroup[]>;

  maintForm: FormGroup;
  baseUrl: string = 'api/system-parameter/product-group-list/';
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

  // url = new URL(this.baseUrl);

  @ViewChild('maintModal', { static: false }) public maintModal: ModalDirective;
  @ViewChild('deleteModal', { static: false })
  public deleteModal: ModalDirective;
  // confirmDialogService: any;

  constructor(
    private fb: FormBuilder,
    private productGroupService: ProductGroupService,
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

      const team$ = this.productGroupService
        .getAll(apiUrl)
        .pipe(map((team) => team.sort(sortAlphaPG)));

      this.isFetching = false;
      // this.tableData$ = contractStatus$;

      this.allData$ = team$;
      this.activeData$ = team$.pipe(
        map((product_groups) =>
          product_groups.filter(
            (product_group) => product_group.is_active === true
          )
        )
      );
      this.inactiveData$ = team$.pipe(
        map((product_groups) =>
          product_groups.filter(
            (product_group) => product_group.is_active === false
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
      product_group: ['', [Validators.required]],
      product_group_description: ['', []],
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
        product_group: record.product_group,
        product_group_description: record.product_group_description,
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
    this.productGroupService.delete(this.id).subscribe((result) => {
      this.getTableData(this.baseUrl);
    });
    this.deleteModal.hide();
  }

  saveRecord() {
    if (this.editing) {
      this.productGroupService
        .update(this.id, this.maintForm.value)
        .subscribe((result) => {
          this.getTableData(this.baseUrl);
        });
      this.editing = false;
    } else {
      this.productGroupService
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
