import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ModalDirective } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';

import { UnitsOfMeasureService } from '../../services/units-of-measure.service';
import { UnitsOfMeasure, sortAlpha } from '../../models/uom.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-capabilities',
  templateUrl: './units-of-measure.component.html',
  styleUrls: ['./units-of-measure.component.css'],
})
export class UnitsOfMeasureComponent implements OnInit {
  tableData$: Observable<UnitsOfMeasure[]>;
  maintForm: FormGroup;
  recordTitle: string;
  id = null;
  editing: boolean;
  isFetching: boolean = false;
  baseUrl: string = 'api/system-parameter/unit-of-measure-list/';
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
    private unitsOfMeasureService: UnitsOfMeasureService
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    this.getTableData(this.baseUrl);
  }

  getTableData(apiUrl: string) {
    this.isFetching = true;

    // const processStatus$ = this.processStatusService.getAll(apiUrl)
    const unitsOfMeasure$ = this.unitsOfMeasureService
      .getAll(apiUrl)
      .pipe(map((unitsOfMeasure) => unitsOfMeasure.sort(sortAlpha)));

    this.isFetching = false;
    this.tableData$ = unitsOfMeasure$;
  }

  createForm() {
    this.maintForm = this.fb.group({
      unit_of_measure: ['', [Validators.required]],
      uom_description: ['', [Validators.required]],
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
      unit_of_measure: record.unit_of_measure,
      uom_description: record.uom_description,
      is_active: record.is_active,
    });

    // this.unitsOfMeasureService.getOne(record.id).subscribe(
    //   (response) => {
    //     this.isFetching = false;

    //     this.id = response.id;
    //     this.isActive = response.is_active;

    //     this.maintForm.patchValue({
    //       unit_of_measure: response.unit_of_measure,
    //       uom_description: response.uom_description,
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
    this.unitsOfMeasureService.delete(this.id).subscribe((result) => {
      this.getTableData(this.baseUrl);
    });
    this.deleteModal.hide();
  }

  saveRecord() {
    if (this.editing) {
      this.unitsOfMeasureService
        .update(this.id, this.maintForm.value)
        .subscribe((result) => {
          this.getTableData(this.baseUrl);
        });
      this.editing = false;
    } else {
      this.unitsOfMeasureService
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
