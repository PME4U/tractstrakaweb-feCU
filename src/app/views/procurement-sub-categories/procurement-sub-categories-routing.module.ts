import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProcurementSubCategoriesComponent } from './procurement-sub-categories.component';

const routes: Routes = [
  {
    path: '',
    component: ProcurementSubCategoriesComponent,
    data: {
      title: 'Procurement Sub-Categories',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProcurementSubCategoriesRoutingModule {}
