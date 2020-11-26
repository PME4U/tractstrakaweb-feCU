import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ModalDirective } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';

import { ProcurementStrategyService } from '../../services/procurement-strategy.service';
import {
  ProcurementStrategy,
  sortAlphaPS,
} from '../../models/procurement-strategy.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-procurement-strategies',
  templateUrl: './procurement-strategies.component.html',
  styleUrls: ['./procurement-strategies.component.css'],
})
export class ProcurementStrategiesComponent implements OnInit {
  tableData$: Observable<ProcurementStrategy[]>;
  maintForm: FormGroup;
  recordTitle: string;
  id = null;
  editing: boolean;
  isFetching: boolean = false;
  baseUrl: string = 'api/system-parameter/procurement-strategy-list/';
  totalRecords: number;
  isActive: boolean;
  inProgress: boolean;

  @ViewChild('maintModal', { static: false }) public maintModal: ModalDirective;
  @ViewChild('deleteModal', { static: false })
  public deleteModal: ModalDirective;

  constructor(
    private fb: FormBuilder,
    private procurementStrategyService: ProcurementStrategyService
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    this.getTableData(this.baseUrl);
  }

  getTableData(apiUrl: string) {
    this.isFetching = true;

    // const processStatus$ = this.processStatusService.getAll(apiUrl)
    const procurementStrategy$ = this.procurementStrategyService
      .getAll(apiUrl)
      .pipe(
        map((procurementStrategy) => procurementStrategy.sort(sortAlphaPS))
      );

    this.isFetching = false;
    this.tableData$ = procurementStrategy$;
  }

  createForm() {
    this.maintForm = this.fb.group({
      procurement_strategy: ['', [Validators.required]],
      stratgey_description: ['', [Validators.required]],
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
    this.procurementStrategyService.getOne(record.id).subscribe(
      (response) => {
        this.isFetching = false;

        this.id = response.id;
        this.isActive = response.is_active;

        this.maintForm.patchValue({
          procurement_strategy: response.procurement_strategy,
          stratgey_description: response.stratgey_description,
          is_active: response.is_active,
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
    this.procurementStrategyService.delete(this.id).subscribe((result) => {
      this.getTableData(this.baseUrl);
    });
    this.deleteModal.hide();
  }

  saveRecord() {
    if (this.editing) {
      this.procurementStrategyService
        .update(this.id, this.maintForm.value)
        .subscribe((result) => {
          this.getTableData(this.baseUrl);
        });
      this.editing = false;
    } else {
      console.log(this.maintForm.value);
      this.procurementStrategyService
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
