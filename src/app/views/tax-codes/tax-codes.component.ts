import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ModalDirective } from 'ngx-bootstrap/modal';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { TaxCodeService } from '../../services/tax-code.service';
import { TaxCode, sortAlpha } from '../../models/tax-code.model';

@Component({
  selector: 'app-teams',
  templateUrl: './tax-codes.component.html',
  styleUrls: ['./tax-codes.component.css'],
})
export class TaxCodesComponent implements OnInit {
  tableData$: Observable<TaxCode[]>;
  allData$: Observable<TaxCode[]>;
  activeData$: Observable<TaxCode[]>;
  inactiveData$: Observable<TaxCode[]>;

  maintForm: FormGroup;
  recordTitle: string;
  id = null;
  editing: boolean;
  isFetching: boolean = false;
  baseUrl: string = 'api/system-parameter/tax-code-list/';

  activeOnly: string = 'All';

  isCurrent: boolean;
  inProgress: boolean;
  isActive: boolean;

  // url = new URL(this.baseUrl);

  @ViewChild('maintModal', { static: false }) public maintModal: ModalDirective;
  @ViewChild('deleteModal', { static: false })
  public deleteModal: ModalDirective;
  // confirmDialogService: any;

  constructor(private fb: FormBuilder, private taxCodeService: TaxCodeService) {
    this.createForm();
  }

  ngOnInit(): void {
    this.getTableData(this.baseUrl);
  }

  getTableData(apiUrl: string) {
    this.isFetching = true;

    const team$ = this.taxCodeService
      .getAll(apiUrl)
      .pipe(map((taxCode) => taxCode.sort(sortAlpha)));

    this.isFetching = false;
    // this.tableData$ = contractStatus$;

    this.allData$ = team$;
    this.activeData$ = team$.pipe(
      map((taxCodes) =>
        taxCodes.filter((taxCode) => taxCode.is_active === true)
      )
    );
    this.inactiveData$ = team$.pipe(
      map((taxCodes) =>
        taxCodes.filter((taxCode) => taxCode.is_active === false)
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
      tax_code: ['', [Validators.required]],
      tax_code_description: ['', []],
      tax_percentage: ['', [Validators.required]],
      is_active: [true, [Validators.required]],
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
    // this.isFetching = true;
    this.id = record.id;
    this.maintForm.patchValue({
      tax_code: record.tax_code,
      tax_code_description: record.tax_code_description,
      tax_percentage: record.tax_percentage,
      is_active: record.is_active,
    });

    // this.taxCodeService.getOne(record.id).subscribe(
    //   (response) => {
    //     this.isFetching = false;

    //     this.id = response.id;
    //     this.isActive = response.is_active;

    //     this.maintForm.patchValue({
    //       tax_code: response.tax_code,
    //       tax_code_description: response.tax_code_description,
    //       tax_percentage: response.tax_percentage,
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
    this.taxCodeService.delete(this.id).subscribe((result) => {
      this.getTableData(this.baseUrl);
    });
    this.deleteModal.hide();
  }

  saveRecord() {
    if (this.editing) {
      this.taxCodeService
        .update(this.id, this.maintForm.value)
        .subscribe((result) => {
          this.getTableData(this.baseUrl);
        });
      this.editing = false;
    } else {
      this.taxCodeService.create(this.maintForm.value).subscribe((result) => {
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
