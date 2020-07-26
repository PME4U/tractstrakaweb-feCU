import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContractStatusComponent } from './contract-status.component';

const routes: Routes = [
  {
    path: '',
    component: ContractStatusComponent,
    data: {
      title: 'ContractStatus',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContractStatusRoutingModule {}
