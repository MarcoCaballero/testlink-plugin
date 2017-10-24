import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
    MdButtonModule, MdCardModule, MdIconModule, MdDialogModule,
    MdListModule, MdMenuModule, MdTooltipModule, MdRadioModule,
    MdSlideToggleModule, MdInputModule, MdCheckboxModule,
    MdToolbarModule, MdSnackBarModule, MdSidenavModule,
    MdTabsModule, MdSelectModule, MdGridListModule, MdExpansionModule,
} from '@angular/material';

import {
    CovalentDataTableModule, CovalentMediaModule, CovalentLoadingModule,
    CovalentNotificationsModule, CovalentLayoutModule, CovalentMenuModule,
    CovalentPagingModule, CovalentSearchModule, CovalentStepsModule,
    CovalentCommonModule, CovalentDialogsModule, CovalentExpansionPanelModule,
    CovalentChipsModule, CovalentVirtualScrollModule,
} from '@covalent/core';
import { CovalentHttpModule } from '@covalent/http';
import { CovalentDynamicFormsModule } from '@covalent/dynamic-forms';

import { mainRoutes } from './main.routes';
import { MainComponent } from './main.component';
import { InstanceLoginComponent } from './instances/login/instance-login.component';
import { DashboardInstanceComponent } from './instances/dashboard/dashboard-instance.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TestPlanComponent } from './dashboard/test-plans/test-plan.component';
import { TestRunnerDialogComponent } from './dashboard/test-runner/test-runner-dialog.component';
import { InstancesService } from 'services/instances.service';

const MATERIAL_MODULES: any[] = [
    MdButtonModule, MdCardModule, MdIconModule, MdDialogModule,
    MdListModule, MdMenuModule, MdTooltipModule, MdRadioModule,
    MdSlideToggleModule, MdInputModule, MdCheckboxModule,
    MdToolbarModule, MdSnackBarModule, MdSidenavModule,
    MdTabsModule, MdSelectModule, MdGridListModule, MdExpansionModule,
];

const ANGULAR_MODULES: any[] = [
    FormsModule, ReactiveFormsModule, CommonModule, RouterModule,
];

const COVALENT_MODULES: any[] = [
    CovalentDataTableModule, CovalentMediaModule, CovalentLoadingModule, CovalentVirtualScrollModule,
    CovalentNotificationsModule, CovalentLayoutModule, CovalentMenuModule, CovalentExpansionPanelModule,
    CovalentPagingModule, CovalentSearchModule, CovalentStepsModule, CovalentChipsModule,
    CovalentCommonModule, CovalentDialogsModule, CovalentHttpModule, CovalentDynamicFormsModule,
];

const TESTLINK_PLUGIN_MODULES: any[] = [
    MainComponent, InstanceLoginComponent, DashboardInstanceComponent, DashboardComponent,
    TestPlanComponent, TestRunnerDialogComponent,
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
    entryComponents: [
        TestRunnerDialogComponent,
    ],
    declarations: [
        TESTLINK_PLUGIN_MODULES,
    ],
    providers: [InstancesService],
})
export class MainModule { }
