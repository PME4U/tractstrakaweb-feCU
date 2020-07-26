import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrequalificationsComponent } from './prequalifications.component';

const routes: Routes = [
  {
    path: '',
    component: PrequalificationsComponent,
    data: {
      title: 'Prequalifications',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrequalificationsRoutingModule {}
