import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CostCentresComponent } from './cost-centres.component';

const routes: Routes = [
  {
    path: '',
    component: CostCentresComponent,
    data: {
      title: 'CostCentres',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CostCentresRoutingModule {}
