import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ModalDirective } from 'ngx-bootstrap/modal';

import { ProcessTypeService } from '../../services/process-type.service';
import { ProcessTypeModel } from '../../models/process-type.model';

@Component({
  selector: 'app-process-types',
  templateUrl: './process-types.component.html',
  styleUrls: ['./process-types.component.css'],
})
export class ProcessTypesComponent implements OnInit {
  tableData: any = [];
  maintForm: FormGroup;
  recordTitle: string;
  id = null;
  editing: boolean;
  isFetching: boolean = false;
  baseUrl: string = 'api/system-parameter/process-type-list/';
  totalRecords: number;
  isActive: boolean;
  inProgress: boolean;

  @ViewChild('maintModal', { static: false }) public maintModal: ModalDirective;
  @ViewChild('deleteModal', { static: false })
  public deleteModal: ModalDirective;

  constructor(
    private fb: FormBuilder,
    private processTypeService: ProcessTypeService
  ) {
    this.tableData = new Array<any>();
    this.createForm();
  }

  ngOnInit(): void {
    this.getTableData(this.baseUrl);
  }

  getTableData(apiUrl: string) {
    this.isFetching = true;

    this.processTypeService.getAll(apiUrl).subscribe(
      (response: ProcessTypeModel[]) => {
        this.isFetching = false;
        this.tableData = response;

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
  }

  createForm() {
    this.maintForm = this.fb.group({
      process_type: ['', [Validators.required]],
      process_type_description: ['', [Validators.required]],
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
    this.processTypeService.getOne(this.baseUrl, record.id).subscribe(
      (response) => {
        this.isFetching = false;

        this.id = response.id;
        this.isActive = response.is_active;

        this.maintForm.patchValue({
          process_type: response.process_type,
          process_type_description: response.process_type_description,
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
    this.processTypeService.delete(this.id).subscribe((result) => {
      this.getTableData(this.baseUrl);
    });
    this.deleteModal.hide();
  }

  saveRecord() {
    if (this.editing) {
      this.processTypeService
        .update(this.id, this.maintForm.value)
        .subscribe((result) => {
          this.getTableData(this.baseUrl);
        });
      this.editing = false;
    } else {
      console.log(this.maintForm.value);
      this.processTypeService
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
