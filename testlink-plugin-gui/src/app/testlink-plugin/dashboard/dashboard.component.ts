import { Component, OnInit, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import {
    TdLoadingService, TdDialogService, TdMediaService, TdDataTableService, TdDataTableSortingOrder,
    ITdDataTableSortChangeEvent, ITdDataTableColumn, IPageChangeEvent,
} from '@covalent/core';

import { ITdDynamicElementConfig, TdDynamicElement, TdDynamicType } from '@covalent/dynamic-forms';

import { IProject } from 'model/project';
import { ITestPlan } from 'model/test-plan';
import { IBuild } from 'model/build';

const BOOLEAN_FORMAT: (v: any) => any = (v: boolean) => (v === true) ? 'ENABLED' : 'NOT ENABLED';

@Component({
    selector: 'testlink-plugin-dashboard',
    templateUrl: 'dashboard.component.html',
    styleUrls: ['dashboard.component.scss'],
})

export class DashboardComponent implements OnInit {
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
            id: '0',
            name: 'Android test app',
            description: 'Test android apps for user experience and performance',
            prefix: 'ATP',
            isEnabledRequirements: true,
            isActive: true,
            isPublic: true,
            testPlans: this.testplans,
        }, {
            id: '1',
            name: 'Java plugin',
            description: 'esting the Java plugin',
            prefix: 'JP-001',
            isEnabledRequirements: true,
            isActive: true,
            isPublic: true,
            testPlans: this.testplans.slice(0, 1),
        }, {
            id: '2',
            name: 'Java plugin Revision',
            description: 'Testing the Java plugin in revision',
            prefix: 'JP-002',
            isEnabledRequirements: true,
            isActive: true,
            isPublic: true,
            testPlans: this.testplans.slice(0, this.testplans.length),
        }, {
            id: '3',
            name: 'Project demo Mica',
            description: 'This is a fake project created to show how the elastest-testlink plugin works',
            prefix: 'PDM',
            isEnabledRequirements: true,
            isActive: true,
            isPublic: true,
            testPlans: this.testplans.slice(1, this.testplans.length),
        },
    ];

    filteredProjects: any[] = this.projects;
    filteredTotal: number = this.projects.length;
    selectedProject: IProject = this.projects[0];

    searchTerm: string = '';
    fromRow: number = 1;
    currentPage: number = 1;
    pageSize: number = 50;
    sortBy: string = 'name';
    selectedRows: any[] = [];
    selectable: boolean = false;
    clickable: boolean = true;
    sortOrder: TdDataTableSortingOrder = TdDataTableSortingOrder.Descending;

    constructor(private _changeDetectorRef: ChangeDetectorRef, public media: TdMediaService, private _dataTableService: TdDataTableService,
        private dialogService: TdDialogService) { }

    ngOnInit(): void {

        this.selectedProject = this.projects[0];
        this.filter();
    }

    change(event: any): void {
        this.selectedProject = event.value;
    }

    sort(sortEvent: ITdDataTableSortChangeEvent): void {
        this.sortBy = sortEvent.name;
        this.sortOrder = sortEvent.order;
        this.filter();
    }

    showAlert(event: any): void {
        this.dialogService.openAlert({
            message: 'You clicked on row: ' + event.row.name,
        });
    }

    search(searchTerm: string): void {
        this.searchTerm = searchTerm;
        this.filter();
    }

    page(pagingEvent: IPageChangeEvent): void {
        this.fromRow = pagingEvent.fromRow;
        this.currentPage = pagingEvent.page;
        this.pageSize = pagingEvent.pageSize;
        this.filter();
    }

    filter(): void {
        let newData: any[] = this.projects;
        let excludedColumns: string[] = this.columns
            .filter((column: ITdDataTableColumn) => {
                return ((column.filter === undefined && column.hidden === true) ||
                    (column.filter !== undefined && column.filter === false));
            }).map((column: ITdDataTableColumn) => {
                return column.name;
            });
        newData = this._dataTableService.filterData(newData, this.searchTerm, true, excludedColumns);
        this.filteredTotal = newData.length;
        newData = this._dataTableService.sortData(newData, this.sortBy, this.sortOrder);
        newData = this._dataTableService.pageData(newData, this.fromRow, this.currentPage * this.pageSize);
        this.filteredProjects = newData;
    }
}
