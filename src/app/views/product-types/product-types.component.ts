import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ModalDirective } from 'ngx-bootstrap/modal';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ProductTypeService } from '../../services/product-type.service';
import { ProductGroupService } from '../../services/product-group.service';
import { UserAccessService } from '../../services/user-admin.service';

import { ProductType, sortAlpha } from '../../models/product-type.model';
import { ProductGroup, sortAlphaPG } from '../../models/product-group.model';

@Component({
  selector: 'app-teams',
  templateUrl: './product-types.component.html',
  styleUrls: ['./product-types.component.css'],
})
export class ProductTypesComponent implements OnInit {
  tableData$: Observable<ProductType[]>;
  allData$: Observable<ProductType[]>;
  activeData$: Observable<ProductType[]>;
  inactiveData$: Observable<ProductType[]>;

  maintForm: FormGroup;
  baseUrl: string = 'api/system-parameter/product-type-list/';
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

  public productGroups$: Observable<ProductGroup[]>;

  // url = new URL(this.baseUrl);

  @ViewChild('maintModal', { static: false }) public maintModal: ModalDirective;
  @ViewChild('deleteModal', { static: false })
  public deleteModal: ModalDirective;
  // confirmDialogService: any;

  constructor(
    private fb: FormBuilder,
    private productTypeService: ProductTypeService,
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

      const productType$ = this.productTypeService
        .getAll(apiUrl)
        .pipe(map((productType) => productType.sort(sortAlpha)));

      this.isFetching = false;
      // this.tableData$ = contractStatus$;

      this.allData$ = productType$;
      this.activeData$ = productType$.pipe(
        map((product_types) =>
          product_types.filter(
            (product_type) => product_type.is_active === true
          )
        )
      );
      this.inactiveData$ = productType$.pipe(
        map((product_types) =>
          product_types.filter(
            (product_type) => product_type.is_active === false
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
      product_group: [
        { value: '', disabled: !this.modify },
        [Validators.required],
      ],
      product_type: ['', [Validators.required]],
      product_type_description: ['', []],
      is_active: [
        { value: true, disabled: !this.modify },
        [Validators.required],
      ],
    });
  }

  addRecord() {
    this.maintModal.show();
    this.getProductGroups();
    this.maintForm.patchValue({
      is_active: true,
    });
  }

  editRecord(record) {
    if (!this.no_access) {
      this.editing = true;
      // this.isFetching = true;
      this.getProductGroups();
      this.id = record.id;
      this.maintForm.patchValue({
        product_group: record.product_group.id,
        product_type: record.product_type,
        product_type_description: record.product_type_description,
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
    this.productTypeService.delete(this.id).subscribe((result) => {
      this.getTableData(this.baseUrl);
    });
    this.deleteModal.hide();
  }

  saveRecord() {
    if (this.editing) {
      this.productTypeService
        .update(this.id, this.maintForm.value)
        .subscribe((result) => {
          this.getTableData(this.baseUrl);
        });
      this.editing = false;
    } else {
      this.productTypeService
        .create(this.maintForm.value)
        .subscribe((result) => {
          this.getTableData(this.baseUrl);
        });
    }
    this.id = undefined;
    this.maintForm.reset();
    this.maintModal.hide();
  }

  getProductGroups() {
    this.productGroups$ = this.productGroupService
      .getAll('api/system-parameter/product-group-list/')
      .pipe(map((productGroup) => productGroup.sort(sortAlphaPG)));
  }

  closeModal() {
    this.maintForm.reset();
    this.maintModal.hide();
  }
}
