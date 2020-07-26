import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RiskClassificationsComponent } from './risk-classifications.component';

const routes: Routes = [
  {
    path: '',
    component: RiskClassificationsComponent,
    data: {
      title: 'RiskClassification',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RiskClassificationRoutingModule {}
