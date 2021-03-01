import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './_helpers/auth.guard';

// Import Containers
import { DefaultLayoutComponent } from './containers';

// Import Components
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { ResetPasswordEmailComponent } from './views/reset-password-email/reset-password-email.component';
import { ResetPasswordComponent } from './views/reset-password/reset-password.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
    canActivate: [AuthGuard],
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
    path: 'reset-password-email',
    component: ResetPasswordEmailComponent,
    data: {
      title: 'Reset Password Email',
    },
  },
  {
    path: 'password-reset/:uidb64/:token',
    component: ResetPasswordComponent,
    data: {
      title: 'Reset Password',
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
        path: 'business-units',
        loadChildren: () =>
          import('./views/business-units/business-units.module').then(
            (m) => m.BusinessUnitsModule
          ),
      },
      {
        path: 'business-unit-levels',
        loadChildren: () =>
          import(
            './views/business-unit-levels/business-unit-levels.module'
          ).then((m) => m.BusinessUnitLevelsModule),
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
        path: 'people',
        loadChildren: () =>
          import('./views/people/people.module').then((m) => m.PeopleModule),
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
        path: 'procurement-categories',
        loadChildren: () =>
          import(
            './views/procurement-categories/procurement-categories.module'
          ).then((m) => m.ProcurementCategoriesModule),
      },
      {
        path: 'procurement-sub-categories',
        loadChildren: () =>
          import(
            './views/procurement-sub-categories/procurement-sub-categories.module'
          ).then((m) => m.ProcurementSubCategoriesModule),
      },
      {
        path: 'procurement-methods',
        loadChildren: () =>
          import('./views/procurement-methods/procurement-methods.module').then(
            (m) => m.ProcurementMethodsModule
          ),
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
        path: 'projects',
        loadChildren: () =>
          import('./views/projects/projects.module').then(
            (m) => m.ProjectsModule
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
        path: 'tax-codes',
        loadChildren: () =>
          import('./views/tax-codes/tax-codes.module').then(
            (m) => m.TaxCodesModule
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
