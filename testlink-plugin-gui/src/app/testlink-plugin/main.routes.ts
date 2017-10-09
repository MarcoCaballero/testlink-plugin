import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainComponent } from './main.component';
import { InstanceLoginComponent } from './instances/login/instance-login.component';
import { DashboardInstanceComponent } from './instances/dashboard/dashboard-instance.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [{
  path: 'testlink-plugin',
  component: MainComponent,
  children: [{
    path: '',
    redirectTo: 'instances',
  },
  {
    path: 'instances',
    component: DashboardInstanceComponent,
  },
  {
    path: 'login-instance/:id',
    component: InstanceLoginComponent,
  },
  {
    path: 'instance-dashboard',
    component: DashboardInstanceComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  }],
}];

export const mainRoutes: ModuleWithProviders = RouterModule.forChild(routes);
