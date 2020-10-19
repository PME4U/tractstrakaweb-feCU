import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BusinessUnitLevelsComponent } from './business-unit-levels.component';

const routes: Routes = [
  {
    path: '',
    component: BusinessUnitLevelsComponent,
    data: {
      title: 'Business Unit Levels',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BusinessUnitLevelsRoutingModule {}
