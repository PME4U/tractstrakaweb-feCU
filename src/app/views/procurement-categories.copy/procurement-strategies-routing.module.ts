import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProcurementStrategiesComponent } from './procurement-strategies.component';

const routes: Routes = [
  {
    path: '',
    component: ProcurementStrategiesComponent,
    data: {
      title: 'Procurement Strategies',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProcurementStrategiesRoutingModule {}
