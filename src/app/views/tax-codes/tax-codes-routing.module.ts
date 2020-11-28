import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TaxCodesComponent } from './tax-codes.component';

const routes: Routes = [
  {
    path: '',
    component: TaxCodesComponent,
    data: {
      title: 'Tax Codes',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TaxCodesRoutingModule {}
