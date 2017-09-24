import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainComponent } from './main.component';
import { NewInstanceComponent } from './new-instance/new-instance.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [{
  path: 'testlink-plugin',
  component: MainComponent,
  children: [{
    path: 'new-instance',
    component: NewInstanceComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  }]
}];

export const mainRoutes: ModuleWithProviders = RouterModule.forChild(routes);
