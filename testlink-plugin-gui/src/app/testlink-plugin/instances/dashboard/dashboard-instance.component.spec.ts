import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { BrowserModule, By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { MaterialModule } from '@angular/material';

import { InstancesService } from 'services/instances.service';
import { InstancesServiceMock } from 'app/mocks/instances.service.mock';
import { IInstance } from 'model/instance';
import { DashboardInstanceComponent } from './dashboard-instance.component';

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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

const MATERIAL_MODULES: any[] = [
    MdButtonModule, MdCardModule, MdIconModule, MdDialogModule,
    MdListModule, MdMenuModule, MdTooltipModule, MdRadioModule,
    MdSlideToggleModule, MdInputModule, MdCheckboxModule,
    MdToolbarModule, MdSnackBarModule, MdSidenavModule,
    MdTabsModule, MdSelectModule, MdGridListModule, MdExpansionModule,
];

const COVALENT_MODULES: any[] = [
    CovalentDataTableModule, CovalentMediaModule, CovalentLoadingModule, CovalentVirtualScrollModule,
    CovalentNotificationsModule, CovalentLayoutModule, CovalentMenuModule, CovalentExpansionPanelModule,
    CovalentPagingModule, CovalentSearchModule, CovalentStepsModule, CovalentChipsModule, CovalentTextEditorModule,
    CovalentCommonModule, CovalentDialogsModule, CovalentHttpModule, CovalentDynamicFormsModule, CovalentMarkdownModule,
    CovalentFileModule,
];

const ANGULAR_MODULES: any[] = [
    BrowserAnimationsModule, RouterTestingModule, CommonModule, FormsModule, ReactiveFormsModule,
];

describe('ContactComponent', () => {
    let comp: DashboardInstanceComponent;
    let fixture: ComponentFixture<DashboardInstanceComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                MATERIAL_MODULES, COVALENT_MODULES, ANGULAR_MODULES,
            ],
            declarations: [
                DashboardInstanceComponent,
            ],
            providers: [
                { provide: InstancesService, useClass: InstancesServiceMock },
            ],
        }).compileComponents();
    }));
    beforeAll(async () => {
        fixture = TestBed.createComponent(DashboardInstanceComponent);
        comp = fixture.debugElement.componentInstance;
        comp.ngOnInit();
    });

    it(`Should load TestLink instances (3 instances)`, async(async() => {
        fixture = TestBed.createComponent(DashboardInstanceComponent);
        comp = fixture.debugElement.componentInstance;
        await comp.loadInstances();
        expect(comp.filteredInstances.length).toEqual(3);
    }));

    it(`Should display HTML instances titles.`, async(async() => {
        fixture = TestBed.createComponent(DashboardInstanceComponent);
        comp = fixture.debugElement.componentInstance;
        await comp.loadInstances();
        fixture.detectChanges();
        const compiled: HTMLElement = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('md-card-content md-list a').textContent).toContain('Instance 1 - Host Instance');
        expect(compiled.querySelector('md-card-content md-list').textContent).toContain('Instance 2 - Apache Server Instance');
        expect(compiled.querySelector('md-card-content md-list').textContent).toContain('Instance 3 - Docker');
    }));
});
