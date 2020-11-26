import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ModalDirective } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ProcurementFrameworksService } from '../../services/procurement-framework.service';
import {
  ProcurementFramework,
  sortAlpha,
} from '../../models/process-framework.model';

@Component({
  selector: 'app-procurement-frameworks',
  templateUrl: './procurement-frameworks.component.html',
  styleUrls: ['./procurement-frameworks.component.css'],
})
export class ProcurementFrameworksComponent implements OnInit {
  tableData$: Observable<ProcurementFramework[]>;
  maintForm: FormGroup;
  recordTitle: string;
  id = null;
  editing: boolean;
  isFetching: boolean = false;
  baseUrl: string = 'api/system-parameter/procurement-framework-list/';
  totalRecords: number;

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
    private procurementFrameworksService: ProcurementFrameworksService
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    this.getTableData(this.baseUrl);
  }

  getTableData(apiUrl: string) {
    this.isFetching = true;

    // const processStatus$ = this.processStatusService.getAll(apiUrl)
    const procurementFrameworks$ = this.procurementFrameworksService
      .getAll(apiUrl)
      .pipe(
        map((procurementFrameworks) => procurementFrameworks.sort(sortAlpha))
      );

    this.isFetching = false;
    this.tableData$ = procurementFrameworks$;
  }

  createForm() {
    this.maintForm = this.fb.group({
      procurement_framework: ['', [Validators.required]],
      procurement_framework_description: ['', [Validators.required]],
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
    this.isFetching = true;
    this.procurementFrameworksService.getOne(record.id).subscribe(
      (response) => {
        this.isFetching = false;

        this.id = response.id;
        this.isActive = response.is_active;

        this.maintForm.patchValue({
          procurement_framework: response.procurement_framework,
          procurement_framework_description:
            response.procurement_framework_description,
          is_active: response.is_active,
        });
        console.log(response);
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
    this.procurementFrameworksService.delete(this.id).subscribe((result) => {
      this.getTableData(this.baseUrl);
    });
    this.deleteModal.hide();
  }

  saveRecord() {
    if (this.editing) {
      this.procurementFrameworksService
        .update(this.id, this.maintForm.value)
        .subscribe((result) => {
          this.getTableData(this.baseUrl);
        });
      this.editing = false;
    } else {
      this.procurementFrameworksService
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
