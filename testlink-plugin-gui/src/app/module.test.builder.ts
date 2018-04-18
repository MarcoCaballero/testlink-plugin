import { CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
    CovalentChipsModule, CovalentVirtualScrollModule, CovalentFileModule,
} from '@covalent/core';
import { CovalentHttpModule, IHttpInterceptor } from '@covalent/http';
import { CovalentDynamicFormsModule } from '@covalent/dynamic-forms';
import { CovalentTextEditorModule } from '@covalent/text-editor';
import { CovalentMarkdownModule } from '@covalent/markdown';

export const MATERIAL_MODULES: any[] = [
    MdButtonModule, MdCardModule, MdIconModule, MdDialogModule,
    MdListModule, MdMenuModule, MdTooltipModule, MdRadioModule,
    MdSlideToggleModule, MdInputModule, MdCheckboxModule,
    MdToolbarModule, MdSnackBarModule, MdSidenavModule,
    MdTabsModule, MdSelectModule, MdGridListModule, MdExpansionModule,
];

export const COVALENT_MODULES: any[] = [
    CovalentDataTableModule, CovalentMediaModule, CovalentLoadingModule, CovalentVirtualScrollModule,
    CovalentNotificationsModule, CovalentLayoutModule, CovalentMenuModule, CovalentExpansionPanelModule,
    CovalentPagingModule, CovalentSearchModule, CovalentStepsModule, CovalentChipsModule, CovalentTextEditorModule,
    CovalentCommonModule, CovalentDialogsModule, CovalentHttpModule, CovalentDynamicFormsModule, CovalentMarkdownModule,
    CovalentFileModule,
];

export const ANGULAR_MODULES: any[] = [
    BrowserAnimationsModule, RouterTestingModule, CommonModule, FormsModule, ReactiveFormsModule,
];
