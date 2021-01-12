import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ModalDirective } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { RoleTypeService } from '../../services/role-type.service';
import { UserAccessService } from '../../services/user-access.service';

import { RoleType, sortAlpha } from '../../models/role-type.model';

@Component({
  selector: 'app-role-types',
  templateUrl: './role-types.component.html',
  styleUrls: ['./role-types.component.css'],
})
export class RoleTypesComponent implements OnInit {
  tableData$: Observable<RoleType[]>;
  maintForm: FormGroup;
  baseUrl: string = 'api/system-parameter/role-type-list/';
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
    private roleTypeService: RoleTypeService,
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
      const roleType$ = this.roleTypeService
        .getAll(apiUrl)
        .pipe(map((roleType) => roleType.sort(sortAlpha)));

      this.isFetching = false;
      this.tableData$ = roleType$;
    }
  }

  createForm() {
    this.maintForm = this.fb.group({
      role_in_process: ['', [Validators.required]],
      used_in_forward_plans: [
        { value: false, disabled: !this.modify },
        [Validators.required],
      ],
      used_in_invitation_processes: [
        { value: false, disabled: !this.modify },
        [Validators.required],
      ],
      used_in_contracts: [
        { value: false, disabled: !this.modify },
        [Validators.required],
      ],
      is_active: [
        { value: true, disabled: !this.modify },
        [Validators.required],
      ],
    });
  }

  addRecord() {
    this.maintModal.show();
    this.maintForm.patchValue({
      used_in_forward_plans: false,
      used_in_invitation_processes: false,
      used_in_contracts: false,
      is_active: true,
    });
  }

  editRecord(record) {
    if (!this.no_access) {
      this.editing = true;
      // this.isFetching = true;
      this.id = record.id;
      this.maintForm.patchValue({
        role_in_process: record.role_in_process,
        used_in_forward_plans: record.used_in_forward_plans,
        used_in_invitation_processes: record.used_in_invitation_processes,
        used_in_contracts: record.used_in_contracts,
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
    this.roleTypeService.delete(this.id).subscribe((result) => {
      this.getTableData(this.baseUrl);
    });
    this.deleteModal.hide();
  }

  saveRecord() {
    if (this.editing) {
      this.roleTypeService
        .update(this.id, this.maintForm.value)
        .subscribe((result) => {
          this.getTableData(this.baseUrl);
        });
      this.editing = false;
    } else {
      this.roleTypeService.create(this.maintForm.value).subscribe((result) => {
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
