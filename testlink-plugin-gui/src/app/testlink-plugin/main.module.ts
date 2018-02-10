import { NgModule, Type } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
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
import { CovalentHttpModule, IHttpInterceptor } from '@covalent/http';
import { CovalentDynamicFormsModule } from '@covalent/dynamic-forms';
import { CovalentTextEditorModule } from '@covalent/text-editor';
import { CovalentMarkdownModule } from '@covalent/markdown';

import { mainRoutes } from './main.routes';
import { MainComponent } from './main.component';
import { InstanceLoginComponent } from './instances/login/instance-login.component';
import { DashboardInstanceComponent } from './instances/dashboard/dashboard-instance.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TestPlanComponent } from './dashboard/test-plans/test-plan.component';
import { TestRunnerComponent } from './dashboard/test-runner/test-runner.component';
import { InstancesService } from './services/instances.service';
import { LocalStorageManagerService } from './services/local-storage-manager.service';
import { TestProjectService } from './services/tlp-api/test-projects.service';

const MATERIAL_MODULES: any[] = [
    MdButtonModule, MdCardModule, MdIconModule, MdDialogModule,
    MdListModule, MdMenuModule, MdTooltipModule, MdRadioModule,
    MdSlideToggleModule, MdInputModule, MdCheckboxModule,
    MdToolbarModule, MdSnackBarModule, MdSidenavModule,
    MdTabsModule, MdSelectModule, MdGridListModule, MdExpansionModule,
];

const ANGULAR_MODULES: any[] = [
    HttpModule, FormsModule, ReactiveFormsModule, CommonModule, RouterModule, HttpClientModule,
];

const COVALENT_MODULES: any[] = [
    CovalentDataTableModule, CovalentMediaModule, CovalentLoadingModule, CovalentVirtualScrollModule,
    CovalentNotificationsModule, CovalentLayoutModule, CovalentMenuModule, CovalentExpansionPanelModule,
    CovalentPagingModule, CovalentSearchModule, CovalentStepsModule, CovalentChipsModule, CovalentTextEditorModule,
    CovalentCommonModule, CovalentDialogsModule, CovalentHttpModule, CovalentDynamicFormsModule, CovalentMarkdownModule,
];

const TESTLINK_PLUGIN_MODULES: any[] = [
    MainComponent, InstanceLoginComponent, DashboardInstanceComponent, DashboardComponent,
    TestPlanComponent, TestRunnerComponent,
];

const TESTLINK_PLUGIN_SERVICES: any[] = [
    InstancesService, LocalStorageManagerService, TestProjectService,
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
        TestRunnerComponent,
    ],
    declarations: [
        TESTLINK_PLUGIN_MODULES,
    ],
    providers: [TESTLINK_PLUGIN_SERVICES],
})
export class MainModule { }
