import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BusinessUnitsComponent } from './business-units.component';

const routes: Routes = [
  {
    path: '',
    component: BusinessUnitsComponent,
    data: {
      title: 'Business Units',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BusinessUnitsRoutingModule {}
