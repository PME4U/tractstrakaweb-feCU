import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProcessTypesComponent } from './process-types.component';

const routes: Routes = [
  {
    path: '',
    component: ProcessTypesComponent,
    data: {
      title: 'ContractActions',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProcessTypesRoutingModule {}
