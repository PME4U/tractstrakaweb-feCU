import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ModalDirective } from 'ngx-bootstrap/modal';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ProjectService } from '../../services/project.service';
import { Project, sortAlpha } from '../../models/project.model';

@Component({
  selector: 'app-teams',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
})
export class ProjectsComponent implements OnInit {
  tableData$: Observable<Project[]>;
  allData$: Observable<Project[]>;

  maintForm: FormGroup;
  recordTitle: string;
  id = null;
  editing: boolean;
  isFetching: boolean = false;
  baseUrl: string = 'api/system-parameter/project-list/';

  @ViewChild('maintModal', { static: false }) public maintModal: ModalDirective;
  @ViewChild('deleteModal', { static: false })
  public deleteModal: ModalDirective;
  // confirmDialogService: any;

  constructor(private fb: FormBuilder, private projectService: ProjectService) {
    this.createForm();
  }

  ngOnInit(): void {
    this.getTableData(this.baseUrl);
  }

  getTableData(apiUrl: string) {
    this.isFetching = true;

    const project$ = this.projectService
      .getAll(apiUrl)
      .pipe(map((project) => project.sort(sortAlpha)));

    this.isFetching = false;
    this.tableData$ = project$;
  }

  createForm() {
    this.maintForm = this.fb.group({
      project_title: ['', [Validators.required]],
      project_description: ['', []],
      project_status: ['', [Validators.required]],
      project_website: ['', []],
      project_notes: ['', []],
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
    this.projectService.getOne(record.id).subscribe(
      (response) => {
        this.isFetching = false;

        this.id = response.id;

        this.maintForm.patchValue({
          project_title: response.project_title,
          project_description: response.project_description,
          project_status: response.project_status,
          project_website: response.project_website,
          project_notes: response.project_notes,
        });
        // console.log(response);
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
    this.projectService.delete(this.id).subscribe((result) => {
      this.getTableData(this.baseUrl);
    });
    this.deleteModal.hide();
  }

  saveRecord() {
    if (this.editing) {
      this.projectService
        .update(this.id, this.maintForm.value)
        .subscribe((result) => {
          this.getTableData(this.baseUrl);
        });
      this.editing = false;
    } else {
      this.projectService.create(this.maintForm.value).subscribe((result) => {
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
