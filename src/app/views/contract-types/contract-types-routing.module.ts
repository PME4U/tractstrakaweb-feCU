import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContractTypesComponent } from './contract-types.component';

const routes: Routes = [
  {
    path: '',
    component: ContractTypesComponent,
    data: {
      title: 'ContractType',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContractTypesRoutingModule {}
