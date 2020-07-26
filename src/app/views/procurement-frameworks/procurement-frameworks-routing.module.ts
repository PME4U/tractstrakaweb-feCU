import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProcurementFrameworksComponent } from './procurement-frameworks.component';

const routes: Routes = [
  {
    path: '',
    component: ProcurementFrameworksComponent,
    data: {
      title: 'ProcurementFramework',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProcurementFrameworksRoutingModule {}
