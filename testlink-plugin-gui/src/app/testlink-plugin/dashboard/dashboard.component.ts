import { Component, OnInit, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import {
    TdLoadingService, TdDialogService, TdMediaService, TdDataTableService, TdDataTableSortingOrder,
    ITdDataTableSortChangeEvent, ITdDataTableColumn, IPageChangeEvent,
} from '@covalent/core';

import { ITdDynamicElementConfig, TdDynamicElement, TdDynamicType } from '@covalent/dynamic-forms';

import { IProject } from 'model/project';

const BOOLEAN_FORMAT: (v: any) => any = (v: boolean) => (v === true) ? 'ENABLED' : 'NOT ENABLED';

@Component({
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

    projects: IProject[] = [
        {
            id: '0',
            name: 'Android test app',
            description: 'Test android apps for user experience and performance',
            prefix: 'ATP',
            isEnabledRequirements: true,
            isActive: true,
            isPublic: true,
        }, {
            id: '1',
            name: 'Java plugin',
            description: 'esting the Java plugin',
            prefix: 'JP-001',
            isEnabledRequirements: true,
            isActive: true,
            isPublic: true,
        }, {
            id: '2',
            name: 'Java plugin Revision',
            description: 'Testing the Java plugin in revision',
            prefix: 'JP-002',
            isEnabledRequirements: true,
            isActive: true,
            isPublic: true,
        }, {
            id: '3',
            name: 'Project demo Mica',
            description: 'This is a fake project created to show how the elastest-testlink plugin works',
            prefix: 'PDM',
            isEnabledRequirements: true,
            isActive: true,
            isPublic: true,
        },
    ];

    filteredProjects: any[] = this.projects;
    filteredTotal: number = this.projects.length;
    selectedProject: string;

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
        this.filter();
    }

    change(event: string): void {
        console.log(event);
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

    ngAfterViewInit(): void {
        /* VERY IMPORTANT, DO NOT REMOVE THAT CODE (MdSidenav issues redrawing on re-calling) */
        setTimeout(() => {
            this.media.broadcast();
            this._changeDetectorRef.detectChanges();
        });
    }
}
