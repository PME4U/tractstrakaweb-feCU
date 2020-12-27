import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ModalDirective } from 'ngx-bootstrap/modal';

import { Observable } from 'rxjs';

import { ContractorRoleTypeService } from '../../services/contractor-role-type.service';
import {
  ContractorRoleType,
  sortAlpha,
} from '../../models/contractor-role-type.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-contractor-type',
  templateUrl: './contractor-role-types.component.html',
  styleUrls: ['./contractor-role-types.component.css'],
})
export class ContractorRoleTypesComponent implements OnInit {
  tableData$: Observable<ContractorRoleType[]>;
  allData$: Observable<ContractorRoleType[]>;
  activeData$: Observable<ContractorRoleType[]>;
  inactiveData$: Observable<ContractorRoleType[]>;

  maintForm: FormGroup;
  recordTitle: string;
  id = null;
  editing: boolean;
  isFetching: boolean = false;
  baseUrl: string = 'api/system-parameter/contractor-role-type-list/';
  // totalRecords: number;

  activeOnly: string = 'All';

  isActive: boolean;

  @ViewChild('maintModal', { static: false }) public maintModal: ModalDirective;
  @ViewChild('deleteModal', { static: false })
  public deleteModal: ModalDirective;

  constructor(
    private fb: FormBuilder,
    private contractorRoleTypeService: ContractorRoleTypeService
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    this.getTableData(this.baseUrl);
  }

  getTableData(apiUrl: string) {
    this.isFetching = true;

    const contractorRoleType$ = this.contractorRoleTypeService
      .getAll(apiUrl)
      .pipe(map((contractorRoleType) => contractorRoleType.sort(sortAlpha)));

    this.isFetching = false;
    // this.tableData$ = contractStatus$;

    this.allData$ = contractorRoleType$;
    this.activeData$ = contractorRoleType$.pipe(
      map((contractorRoleType) =>
        contractorRoleType.filter(
          (contractorRoleType) => contractorRoleType.is_active === true
        )
      )
    );
    this.inactiveData$ = contractorRoleType$.pipe(
      map((contractorRoleType) =>
        contractorRoleType.filter(
          (contractorRoleType) => contractorRoleType.is_active === false
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

  createForm() {
    this.maintForm = this.fb.group({
      contractor_role_type: ['', [Validators.required]],
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
      contractor_role_type: record.contractor_role_type,
      is_active: record.is_active,
    });
    // this.contractorRoleTypeService.getOne(record.id).subscribe(
    //   (response) => {
    //     this.isFetching = false;

    //     this.id = response.id;
    //     this.isActive = response.is_active;

    //     this.maintForm.patchValue({
    //       contractor_role_type: response.contractor_role_type,
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
    this.contractorRoleTypeService.delete(this.id).subscribe((result) => {
      this.getTableData(this.baseUrl);
    });
    this.deleteModal.hide();
  }

  saveRecord() {
    if (this.editing) {
      this.contractorRoleTypeService
        .update(this.id, this.maintForm.value)
        .subscribe((result) => {
          this.getTableData(this.baseUrl);
        });
      this.editing = false;
    } else {
      this.contractorRoleTypeService
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
