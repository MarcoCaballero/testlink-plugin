import { Component, OnInit, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import {
    TdLoadingService, TdDialogService, TdMediaService, TdDataTableService, TdDataTableSortingOrder,
    ITdDataTableSortChangeEvent, ITdDataTableColumn, IPageChangeEvent,
} from '@covalent/core';

import { IProject } from '../model/project';
import { ITestPlan } from '../model/test-plan';
import { IBuild } from '../model/build';

const BOOLEAN_FORMAT: (v: any) => any = (v: boolean) => (v === true) ? 'ENABLED' : 'NOT ENABLED';

@Component({
    changeDetection: ChangeDetectionStrategy.Default,
    selector: 'testlink-plugin-dashboard',
    templateUrl: 'dashboard.component.html',
    styleUrls: ['dashboard.component.scss'],
})

export class DashboardComponent implements OnInit, AfterViewInit {

    menuItems: Object[] = [
        {
            icon: 'home',
            route: '.',
            title: 'Home',
        },
    ];

    columns: ITdDataTableColumn[] = [
        { name: 'name', label: 'Project name', sortable: true, filter: true, width: 150 },
        { name: 'description', label: 'Description', sortable: true, filter: true, width: 300 },
        { name: 'prefix', label: 'Prefix', sortable: true, filter: true, width: 50 },
        { name: 'issue tracker', label: 'issues tracker', sortable: true, filter: true, hidden: true },
        { name: 'isEnabledRequirements', label: 'Requirement', sortable: true, filter: true, width: 100 },
        { name: 'isActive', label: '¿is active?', sortable: true, filter: true, width: 100 },
        { name: 'isPublic', label: '¿is public?', sortable: true, filter: true, width: 100 },
    ];

    builds: IBuild[] = [
        {
            id: '0',
            testSuitName: 'Main tests',
            testCase: 'Test browser compatibility',
            platform: 'CHrome_12.3',
            priority: 'HIGH',
            status: 'NOT_RUN',
            assignedSince: new Date('7/01/2017'),
        },
        {
            id: '1',
            testSuitName: 'Login tests',
            testCase: 'Test browser compatibility',
            platform: 'CHrome_12.3',
            priority: 'HIGH',
            status: 'PASSED',
            assignedSince: new Date('7/01/2017'),
        },
        {
            id: '2',
            testSuitName: 'Logut tests',
            testCase: 'Test browser compatibility',
            platform: 'CHrome_12.3',
            priority: 'HIGH',
            status: 'PASSED',
            assignedSince: new Date('7/01/2017'),
        },
    ];

    testplans: ITestPlan[] = [
        {
            id: '0',
            name: 'test-plan-01',
            description: 'lorem ipsum sit amen sit amen lorep ismums',
            testCaseCount: 3,
            buildCount: 3,
            isActive: true,
            isPublic: true,
            builds: this.builds,
        },
        {
            id: '1',
            name: 'test-plan-02',
            description: 'lorem ipsum sit amen sit amen lorep ismums',
            testCaseCount: 3,
            buildCount: 3,
            platform: 'Chrome_234.3',
            isActive: true,
            isPublic: true,
            builds: this.builds.slice(1, this.builds.length),
        },
        {
            id: '2',
            name: 'test-plan-03',
            description: 'lorem ipsum sit amen sit amen lorep ismums',
            testCaseCount: 3,
            buildCount: 3,
            isActive: true,
            isPublic: true,
            builds: this.builds.slice(2, this.builds.length),
        },
    ];

    projects: IProject[] = [
        {
            id: 1,
            name: 'Android test app',
            prefix: 'ATP',
            notes: '<p>Test android apps for user experience and perfomance.</p>',
            enableRequirements: true,
            enableTestPriority: true,
            enableAutomation: true,
            enableInventory: true,
            public: true,
            active: true,
            testPlans: this.testplans,
        },
        {
            id: 19,
            name: 'Java plugin',
            prefix: 'JP-001',
            notes: '<p>Testing the Java plugin</p>',
            enableRequirements: true,
            enableTestPriority: true,
            enableAutomation: true,
            enableInventory: true,
            public: true,
            active: true,
            testPlans: this.testplans,
        },
        {
            id: 20,
            name: 'Java plugin Revision',
            prefix: 'JP-002',
            notes: '<p>Testing the Java plugin in revision</p>',
            enableRequirements: true,
            enableTestPriority: true,
            enableAutomation: true,
            enableInventory: false,
            public: true,
            active: true,
            testPlans: this.testplans.slice(0, 1),
        },
        {
            id: 21,
            name: 'Project demo mica',
            prefix: 'PDM',
            notes: '<p>This is a fake project created to show how the elastest-testlink plugin works.</p>',
            enableRequirements: true,
            enableTestPriority: true,
            enableAutomation: true,
            enableInventory: true,
            public: true,
            active: true,
            testPlans: this.testplans.slice(0, 1),
        },
    ];

    filteredProjects: any[] = this.projects;
    filteredTotal: number = this.projects.length;
    selectedProject: IProject = this.projects[0];

    searchTerm: string = '';

    opened: boolean = false;
    optionalText: string = (!this.opened) ? 'Open All' : 'Close all';

    constructor(private _changeDetectorRef: ChangeDetectorRef, public media: TdMediaService,
        private _dataTableService: TdDataTableService) { }

    ngOnInit(): void {
        this.selectedProject = this.projects[0];
    }

    change(event: any): void {
        this.selectedProject = event.value;
    }

    ngAfterViewInit(): void {
        /* VERY IMPORTANT, DO NOT REMOVE THAT CODE (MdSidenav issues redrawing on re-calling) */
        setTimeout(() => {
            this.media.broadcast();
            this._changeDetectorRef.detectChanges();
        });
    }

    toggleOpened(): void {
        this.opened = !this.opened;
        this.optionalText = (!this.opened) ? 'Open All' : 'Close all';
        console.log(`opened: ${this.opened}`);
    }
}
