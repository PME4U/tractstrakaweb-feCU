import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductTypesComponent } from './product-types.component';

const routes: Routes = [
  {
    path: '',
    component: ProductTypesComponent,
    data: {
      title: 'Product Type',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductTypesRoutingModule {}
