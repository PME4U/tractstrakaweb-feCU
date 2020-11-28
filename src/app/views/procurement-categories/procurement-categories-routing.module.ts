import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProcurementCategoriesComponent } from './procurement-categories.component';

const routes: Routes = [
  {
    path: '',
    component: ProcurementCategoriesComponent,
    data: {
      title: 'Procurement Categories',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProcurementCategoriesRoutingModule {}
