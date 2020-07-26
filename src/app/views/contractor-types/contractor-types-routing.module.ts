import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContractorTypesComponent } from './contractor-types.component';

const routes: Routes = [
  {
    path: '',
    component: ContractorTypesComponent,
    data: {
      title: 'ContractorType',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContractorTypesRoutingModule {}
