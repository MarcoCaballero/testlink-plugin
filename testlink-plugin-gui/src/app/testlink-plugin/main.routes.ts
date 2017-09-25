import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainComponent } from './main.component';
import { NewInstanceComponent } from './instances/new/new-instance.component';
import { LoginComponent } from './login/login.component';
import { DashboardInstanceComponent } from './instances/dashboard/dashboard-instance.component';

const routes: Routes = [{
  path: 'testlink-plugin',
  component: MainComponent,
  children: [{
    path: 'new-instance',
    component: NewInstanceComponent,
  },
  {
    path: 'instance-dashboard',
    component: DashboardInstanceComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  }],
}];

export const mainRoutes: ModuleWithProviders = RouterModule.forChild(routes);
