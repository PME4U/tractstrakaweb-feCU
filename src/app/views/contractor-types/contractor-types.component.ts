import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ModalDirective } from 'ngx-bootstrap/modal';

import { Observable } from 'rxjs';

import { ContractorTypeService } from '../../services/contractor-type.service';
import { UserAccessService } from '../../services/user-admin.service';

import { ContractorType, sortAlpha } from '../../models/contractor-type.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-contractor-type',
  templateUrl: './contractor-types.component.html',
  styleUrls: ['./contractor-types.component.css'],
})
export class ContractorTypesComponent implements OnInit {
  tableData$: Observable<ContractorType[]>;
  maintForm: FormGroup;
  baseUrl: string = 'api/system-parameter/contractor-type-list/';
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

  @ViewChild('maintModal', { static: false }) public maintModal: ModalDirective;
  @ViewChild('deleteModal', { static: false })
  public deleteModal: ModalDirective;

  constructor(
    private fb: FormBuilder,
    private contractorTypeService: ContractorTypeService,
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
      const contractorType$ = this.contractorTypeService
        .getAll(apiUrl)
        .pipe(map((contractorType) => contractorType.sort(sortAlpha)));

      this.isFetching = false;
      this.tableData$ = contractorType$;
    }
  }

  createForm() {
    this.maintForm = this.fb.group({
      contractor_type: ['', [Validators.required]],
      contractor_type_description: ['', [Validators.required]],
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
      this.id = record.id;
      // this.isFetching = true;
      this.maintForm.patchValue({
        contractor_type: record.contractor_type,
        contractor_type_description: record.contractor_type_description,
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
    this.contractorTypeService.getAll(this.id).subscribe((result) => {
      this.getTableData(this.baseUrl);
    });
    this.deleteModal.hide();
  }

  saveRecord() {
    if (this.editing) {
      this.contractorTypeService
        .update(this.id, this.maintForm.value)
        .subscribe((result) => {
          this.getTableData(this.baseUrl);
        });
      this.editing = false;
    } else {
      this.contractorTypeService
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
