import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProcurementMethodsComponent } from './procurement-methods.component';

const routes: Routes = [
  {
    path: '',
    component: ProcurementMethodsComponent,
    data: {
      title: 'Procurement Methods',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProcurementMethodsRoutingModule {}
