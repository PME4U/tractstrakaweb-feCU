import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ModalDirective } from 'ngx-bootstrap/modal';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ComplexityService } from '../../services/complexity.service';
import { Complexity, sortAlpha } from '../../models/complexity.model';

@Component({
  selector: 'app-complexities',
  templateUrl: './complexities.component.html',
  styleUrls: ['./complexities.component.css'],
})
export class ComplexitiesComponent implements OnInit {
  tableData$: Observable<Complexity[]>;
  maintForm: FormGroup;
  recordTitle: string;
  id = null;
  editing: boolean;
  isFetching: boolean = false;
  baseUrl: string = 'api/system-parameter/complexity-classification-list/';
  totalRecords: number;
  next: string;
  previous: string;
  usePagination: boolean = false;
  limit: number;
  offset: number;
  pages: any = [];
  page: number = 1;

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
    private complexityService: ComplexityService
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    this.getTableData(this.baseUrl);
  }

  getTableData(apiUrl: string) {
    this.isFetching = true;

    const complexity$ = this.complexityService
      .getAll(apiUrl)
      .pipe(map((complexity) => complexity.sort(sortAlpha)));

    this.isFetching = false;
    this.tableData$ = complexity$;
  }

  createForm() {
    this.maintForm = this.fb.group({
      complexity_classification: ['', [Validators.required]],
      complexity_description: ['', [Validators.required]],
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
    this.id = record.id;
    // this.isFetching = true;
    this.maintForm.patchValue({
      complexity_classification: record.complexity_classification,
      complexity_description: record.complexity_description,
      is_active: record.is_active,
    });
    // this.complexityService.getOne(record.id).subscribe(
    //   (response) => {
    //     this.isFetching = false;

    //     this.id = response.id;
    //     this.isActive = response.is_active;

    //     this.maintForm.patchValue({
    //       complexity_classification: response.complexity_classification,
    //       complexity_description: response.complexity_description,
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
    this.complexityService.delete(this.id).subscribe((result) => {
      this.getTableData(this.baseUrl);
    });
    this.deleteModal.hide();
  }

  saveRecord() {
    if (this.editing) {
      this.complexityService
        .update(this.id, this.maintForm.value)
        .subscribe((result) => {
          this.getTableData(this.baseUrl);
        });
      this.editing = false;
    } else {
      this.complexityService
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
