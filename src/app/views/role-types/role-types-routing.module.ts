import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RoleTypesComponent } from './role-types.component';

const routes: Routes = [
  {
    path: '',
    component: RoleTypesComponent,
    data: {
      title: 'RoleType',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RoleTypesRoutingModule {}
