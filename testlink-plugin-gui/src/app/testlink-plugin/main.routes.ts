import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainComponent } from './main.component';

const routes: Routes = [{
  path: 'testlink-plugin',
  component: MainComponent,
}];

export const mainRoutes: ModuleWithProviders = RouterModule.forChild(routes);
