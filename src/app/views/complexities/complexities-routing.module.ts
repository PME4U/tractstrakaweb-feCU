import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ComplexitiesComponent } from './complexities.component';

const routes: Routes = [
  {
    path: '',
    component: ComplexitiesComponent,
    data: {
      title: 'Complexities',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComplexitiesRoutingModule {}
