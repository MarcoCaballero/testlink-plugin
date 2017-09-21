import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
    MdButtonModule, MdCardModule, MdIconModule,
    MdListModule, MdMenuModule, MdTooltipModule,
    MdSlideToggleModule, MdInputModule, MdCheckboxModule,
    MdToolbarModule, MdSnackBarModule, MdSidenavModule,
    MdTabsModule, MdSelectModule,
} from '@angular/material';

import {
    CovalentDataTableModule, CovalentMediaModule, CovalentLoadingModule,
    CovalentNotificationsModule, CovalentLayoutModule, CovalentMenuModule,
    CovalentPagingModule, CovalentSearchModule, CovalentStepsModule,
    CovalentCommonModule, CovalentDialogsModule,
} from '@covalent/core';
import { CovalentHttpModule } from '@covalent/http';

import { mainRoutes } from './main.routes';
import { MainComponent } from './main.component';

const MATERIAL_MODULES: any[] = [
    MdButtonModule, MdCardModule, MdIconModule,
    MdListModule, MdMenuModule, MdTooltipModule,
    MdSlideToggleModule, MdInputModule, MdCheckboxModule,
    MdToolbarModule, MdSnackBarModule, MdSidenavModule,
    MdTabsModule, MdSelectModule,
];

const ANGULAR_MODULES: any[] = [
    FormsModule, ReactiveFormsModule, CommonModule, RouterModule,
];

const COVALENT_MODULES: any[] = [
  CovalentDataTableModule, CovalentMediaModule, CovalentLoadingModule,
  CovalentNotificationsModule, CovalentLayoutModule, CovalentMenuModule,
  CovalentPagingModule, CovalentSearchModule, CovalentStepsModule,
  CovalentCommonModule, CovalentDialogsModule, CovalentHttpModule,
];

@NgModule({
    imports: [
        ANGULAR_MODULES,
        MATERIAL_MODULES,
        COVALENT_MODULES,
        mainRoutes,
    ],
    exports: [],
    declarations: [MainComponent],
    providers: [],
})
export class MainModule { }
