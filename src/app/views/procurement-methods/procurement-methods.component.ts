import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ModalDirective } from 'ngx-bootstrap/modal';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ProcurementStrategyService } from '../../services/procurement-strategy.service';
import {
  ProcurementStrategy,
  sortAlphaPS,
} from '../../models/procurement-strategy.model';

import { ProcurementMethodService } from '../../services/procurement-method.service';
import {
  ProcurementMethod,
  sortAlpha,
} from '../../models/procurement-method.model';

@Component({
  selector: 'app-teams',
  templateUrl: './procurement-methods.component.html',
  styleUrls: ['./procurement-methods.component.css'],
})
export class ProcurementMethodsComponent implements OnInit {
  tableData$: Observable<ProcurementMethod[]>;
  allData$: Observable<ProcurementMethod[]>;
  activeData$: Observable<ProcurementMethod[]>;
  inactiveData$: Observable<ProcurementMethod[]>;

  maintForm: FormGroup;
  recordTitle: string;

  id = null;
  editing: boolean;
  isFetching: boolean = false;
  baseUrl: string = 'api/system-parameter/procurement-method-list/';

  activeOnly: string = 'All';

  isCurrent: boolean;
  inProgress: boolean;
  isActive: boolean;

  public procurementStrategies$: Observable<ProcurementStrategy[]>;

  // url = new URL(this.baseUrl);

  @ViewChild('maintModal', { static: false }) public maintModal: ModalDirective;
  @ViewChild('deleteModal', { static: false })
  public deleteModal: ModalDirective;
  // confirmDialogService: any;

  constructor(
    private fb: FormBuilder,
    private procurementMethodService: ProcurementMethodService,
    private procurementStrategyService: ProcurementStrategyService
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    this.getTableData(this.baseUrl);
  }

  getTableData(apiUrl: string) {
    this.isFetching = true;

    const procurementMethod$ = this.procurementMethodService
      .getAll(apiUrl)
      .pipe(map((procurementMethod) => procurementMethod.sort(sortAlpha)));

    this.isFetching = false;
    // this.tableData$ = contractStatus$;

    this.allData$ = procurementMethod$;
    this.activeData$ = procurementMethod$.pipe(
      map((procurementMethods) =>
        procurementMethods.filter(
          (procurementMethod) => procurementMethod.is_active === true
        )
      )
    );
    this.inactiveData$ = procurementMethod$.pipe(
      map((procurementMethods) =>
        procurementMethods.filter(
          (procurementMethod) => procurementMethod.is_active === false
        )
      )
    );
    // this.tableData$ = this.allData$;
    this.filterOnActive();
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
      procurement_strategy: ['', [Validators.required]],
      procurement_method: ['', [Validators.required]],
      method_description: ['', []],
      is_active: [true, [Validators.required]],
    });
  }

  addRecord() {
    this.maintModal.show();
    this.getProcurementStrategy();
    this.maintForm.patchValue({
      is_active: true,
    });
  }

  editRecord(record) {
    this.editing = true;
    // this.isFetching = true;
    this.getProcurementStrategy();
    this.id = record.id;
    this.maintForm.patchValue({
      procurement_strategy: record.procurement_strategy.id,
      procurement_method: record.procurement_method,
      method_description: record.method_description,
      is_active: record.is_active,
    });
    // this.procurementMethodService.getOne(record.id).subscribe(
    //   (response) => {
    //     this.isFetching = false;

    //     this.id = response.id;
    //     this.isActive = response.is_active;
    //     // console.log(response.procurement_method);
    //     this.maintForm.patchValue({
    //       procurement_strategy: response.procurement_strategy.id,
    //       procurement_method: response.procurement_method,
    //       method_description: response.method_description,
    //       is_active: response.is_active,
    //     });
    //     // console.log(response);
    //     // console.log(this.tableData);
    //     // console.log('Total records:' + this.totalRecords);
    //     // console.log(this.next);
    //     // console.log(this.previous);
    //   },
    //   (error) => {
    //     alert(error.message);
    //   }
    // );
    this.maintModal.show();
  }

  confirmDelete(record) {
    this.id = record.id;
    this.deleteModal.show();
  }
  deleteRecord() {
    this.procurementMethodService.delete(this.id).subscribe((result) => {
      this.getTableData(this.baseUrl);
    });
    this.deleteModal.hide();
  }

  saveRecord() {
    if (this.editing) {
      this.procurementMethodService
        .update(this.id, this.maintForm.value)
        .subscribe((result) => {
          this.getTableData(this.baseUrl);
        });
      this.editing = false;
    } else {
      this.procurementMethodService
        .create(this.maintForm.value)
        .subscribe((result) => {
          this.getTableData(this.baseUrl);
        });
    }
    this.id = undefined;
    this.maintForm.reset();
    this.maintModal.hide();
  }

  getProcurementStrategy() {
    this.procurementStrategies$ = this.procurementStrategyService
      .getAll('api/system-parameter/procurement-strategy-list/')
      .pipe(
        map((procurementStrategy) => procurementStrategy.sort(sortAlphaPS))
      );
  }

  closeModal() {
    this.maintForm.reset();
    this.maintModal.hide();
  }
}
