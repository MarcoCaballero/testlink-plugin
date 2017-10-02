import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
    MdButtonModule, MdCardModule, MdIconModule,
    MdListModule, MdMenuModule, MdTooltipModule,
    MdSlideToggleModule, MdInputModule, MdCheckboxModule,
    MdToolbarModule, MdSnackBarModule, MdSidenavModule,
    MdTabsModule, MdSelectModule, MdGridListModule,
} from '@angular/material';

import {
    CovalentDataTableModule, CovalentMediaModule, CovalentLoadingModule,
    CovalentNotificationsModule, CovalentLayoutModule, CovalentMenuModule,
    CovalentPagingModule, CovalentSearchModule, CovalentStepsModule,
    CovalentCommonModule, CovalentDialogsModule, CovalentExpansionPanelModule,
    CovalentChipsModule,
} from '@covalent/core';
import { CovalentHttpModule } from '@covalent/http';
import { CovalentDynamicFormsModule } from '@covalent/dynamic-forms';

import { mainRoutes } from './main.routes';
import { MainComponent } from './main.component';
import { NewInstanceComponent } from './instances/new/new-instance.component';
import { LoginComponent } from './login/login.component';
import { DashboardInstanceComponent } from './instances/dashboard/dashboard-instance.component';
import { InstancesService } from 'services/instances.service';

const MATERIAL_MODULES: any[] = [
    MdButtonModule, MdCardModule, MdIconModule,
    MdListModule, MdMenuModule, MdTooltipModule,
    MdSlideToggleModule, MdInputModule, MdCheckboxModule,
    MdToolbarModule, MdSnackBarModule, MdSidenavModule,
    MdTabsModule, MdSelectModule, MdGridListModule,
];

const ANGULAR_MODULES: any[] = [
    FormsModule, ReactiveFormsModule, CommonModule, RouterModule,
];

const COVALENT_MODULES: any[] = [
    CovalentDataTableModule, CovalentMediaModule, CovalentLoadingModule,
    CovalentNotificationsModule, CovalentLayoutModule, CovalentMenuModule,
    CovalentPagingModule, CovalentSearchModule, CovalentStepsModule,
    CovalentCommonModule, CovalentDialogsModule, CovalentHttpModule, CovalentDynamicFormsModule,
];

const TESTLINK_PLUGIN_MODULES: any[] = [
    MainComponent, NewInstanceComponent, DashboardInstanceComponent, LoginComponent,
];
const TESTLINK_PLUGIN_SERVICES: any[] = [
    InstancesService,
];

@NgModule({
    imports: [
        ANGULAR_MODULES,
        MATERIAL_MODULES,
        COVALENT_MODULES,
        mainRoutes,
    ],
    exports: [],
    declarations: [
        TESTLINK_PLUGIN_MODULES,
    ],
    providers: [InstancesService],
})
export class MainModule { }
