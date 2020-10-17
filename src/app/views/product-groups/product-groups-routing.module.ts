import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductGroupsComponent } from './product-groups.component';

const routes: Routes = [
  {
    path: '',
    component: ProductGroupsComponent,
    data: {
      title: 'Product Group',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductGroupsRoutingModule {}
