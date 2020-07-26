import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserAdminComponent } from './user-admin.component';

const routes: Routes = [
  {
    path: '',
    component: UserAdminComponent,
    data: {
      title: 'UserAdmin',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserAdminRoutingModule {}
