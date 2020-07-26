import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CapabilitiesComponent } from './capabilities.component';

const routes: Routes = [
  {
    path: '',
    component: CapabilitiesComponent,
    data: {
      title: 'Capabilities',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CapabilitiesRoutingModule {}
