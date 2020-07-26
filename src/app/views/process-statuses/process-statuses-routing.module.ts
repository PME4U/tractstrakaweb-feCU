import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProcessStatusesComponent } from './process-statuses.component';

const routes: Routes = [
  {
    path: '',
    component: ProcessStatusesComponent,
    data: {
      title: 'ContractActions',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProcessStatusesRoutingModule {}
