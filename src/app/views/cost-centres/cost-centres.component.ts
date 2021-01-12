import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ModalDirective } from 'ngx-bootstrap/modal';

import { CostCentreService } from '../../services/cost-centre.service';
import { UserAccessService } from '../../services/user-access.service';

@Component({
  selector: 'app-cost-centres',
  templateUrl: './cost-centres.component.html',
  styleUrls: ['./cost-centres.component.css'],
})
export class CostCentresComponent implements OnInit {
  tableData: any = [];
  maintForm: FormGroup;
  baseUrl: string = 'api/system-parameter/cost-centre-list/';
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
    private costCentreService: CostCentreService,
    private userAccessService: UserAccessService
  ) {
    this.tableData = new Array<any>();
    this.createForm();
  }

  ngOnInit(): void {
    this.getTableData(this.baseUrl);
  }

  getTableData(apiUrl: string) {
    // let splitUrl: any = [];
    if (!this.no_access) {
      this.isFetching = true;

      this.costCentreService.getAll(apiUrl).subscribe(
        (response) => {
          this.isFetching = false;
          this.tableData = response;
          this.totalRecords = response.count;

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
  }

  createForm() {
    this.maintForm = this.fb.group({
      cost_centre_id: ['', [Validators.required]],
      cost_centre_name: ['', [Validators.required]],
      business_unit: ['', [Validators.required]],
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
        cost_centre_id: record.cost_centre_id,
        cost_centre_name: record.cost_centre_name,
        business_unit: record.business_unit,
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
    this.costCentreService.delete(this.id).subscribe((result) => {
      this.getTableData(this.baseUrl);
    });
    this.deleteModal.hide();
  }

  saveRecord() {
    if (this.editing) {
      this.costCentreService
        .update(this.id, this.maintForm.value)
        .subscribe((result) => {
          this.getTableData(this.baseUrl);
        });
      this.editing = false;
    } else {
      this.costCentreService
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
