import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContractorRoleTypesComponent } from './contractor-role-types.component';

const routes: Routes = [
  {
    path: '',
    component: ContractorRoleTypesComponent,
    data: {
      title: 'ContractorRoleType',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContractorRoleTypesRoutingModule {}
