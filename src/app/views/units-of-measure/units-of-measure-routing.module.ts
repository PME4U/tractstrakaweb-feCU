import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UnitsOfMeasureComponent } from './units-of-measure.component';

const routes: Routes = [
  {
    path: '',
    component: UnitsOfMeasureComponent,
    data: {
      title: 'UnitsOfMeasure',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UnitsOfMeasureRoutingModule {}
