import { Component, Inject, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-root',
  templateUrl: './error-dialog.component.html'
})
export class ErrorDialogComponent {
  title = 'Angular-Interceptor';

  @ViewChild('deleteModal', { static: false })
  public errorModal: ModalDirective;
  constructor() {}
}