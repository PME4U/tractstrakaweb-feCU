import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import { DefaultLayoutComponent } from './containers';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page',
    },
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Login Page',
    },
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home',
    },
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./views/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: 'capabilities',
        loadChildren: () =>
          import('./views/capabilities/capabilities.module').then(
            (m) => m.CapabilitiesModule
          ),
      },
      {
        path: 'complexities',
        loadChildren: () =>
          import('./views/complexities/complexities.module').then(
            (m) => m.ComplexitiesModule
          ),
      },
      {
        path: 'contract-status',
        loadChildren: () =>
          import('./views/contract-status/contract-status.module').then(
            (m) => m.ContractStatusModule
          ),
      },
      {
        path: 'contract-types',
        loadChildren: () =>
          import('./views/contract-types/contract-types.module').then(
            (m) => m.ContractTypesModule
          ),
      },
      {
        path: 'contractor-types',
        loadChildren: () =>
          import('./views/contractor-types/contractor-types.module').then(
            (m) => m.ContractorTypesModule
          ),
      },
      {
        path: 'contractor-role-types',
        loadChildren: () =>
          import(
            './views/contractor-role-types/contractor-role-types.module'
          ).then((m) => m.ContractorRoleTypesModule),
      },
      {
        path: 'cost-centres',
        loadChildren: () =>
          import('./views/cost-centres/cost-centres.module').then(
            (m) => m.CostCentresModule
          ),
      },
      {
        path: 'prequalifications',
        loadChildren: () =>
          import('./views/prequalifications/prequalifications.module').then(
            (m) => m.PrequalificationsModule
          ),
      },
      {
        path: 'process-statuses',
        loadChildren: () =>
          import('./views/process-statuses/process-statuses.module').then(
            (m) => m.ProcessStatusesModule
          ),
      },
      {
        path: 'process-types',
        loadChildren: () =>
          import('./views/process-types/process-types.module').then(
            (m) => m.ProcessTypesModule
          ),
      },
      {
        path: 'procurement-frameworks',
        loadChildren: () =>
          import(
            './views/procurement-frameworks/procurement-frameworks.module'
          ).then((m) => m.ProcurementFrameworksModule),
      },
      {
        path: 'procurement-methods',
        loadChildren: () =>
          import(
            './views/procurement-methods/procurement-methods.module'
          ).then((m) => m.ProcurementMethodsModule),
      },
      {
        path: 'procurement-strategies',
        loadChildren: () =>
          import(
            './views/procurement-strategies/procurement-strategies.module'
          ).then((m) => m.ProcurementStrategiesModule),
      },
      {
        path: 'product-groups',
        loadChildren: () =>
          import('./views/product-groups/product-groups.module').then(
            (m) => m.ProductGroupsModule
          ),
      },
      {
        path: 'product-types',
        loadChildren: () =>
          import('./views/product-types/product-types.module').then(
            (m) => m.ProductTypesModule
          ),
      },
      {
        path: 'risk-classifications',
        loadChildren: () =>
          import(
            './views/risk-classifications/risk-classifications.module'
          ).then((m) => m.RiskClassificationsModule),
      },
      {
        path: 'role-types',
        loadChildren: () =>
          import('./views/role-types/role-types.module').then(
            (m) => m.RoleTypesModule
          ),
      },
      {
        path: 'teams',
        loadChildren: () =>
          import('./views/teams/teams.module').then((m) => m.TeamsModule),
      },
      {
        path: 'user-access',
        loadChildren: () =>
          import('./views/user-admin/user-admin.module').then(
            (m) => m.UserAdminModule
          ),
      },
      {
        path: 'unit-of-measure',
        loadChildren: () =>
          import('./views/units-of-measure/units-of-measure.module').then(
            (m) => m.UnitsOfMeasureModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
