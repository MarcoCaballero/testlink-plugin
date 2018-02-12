import { Component, OnInit, AfterViewInit, ChangeDetectorRef, ChangeDetectionStrategy, Input, HostBinding, } from '@angular/core';
import { ITdDataTableColumn, TdDataTableSortingOrder, TdMediaService, TdDataTableService, ITdDataTableSortChangeEvent } from '@covalent/core';
import { Router } from '@angular/router';

import { TestRunnerComponent, } from '../test-runner/test-runner.component';
import { IBuild } from 'model/build';
import { ITestCase } from 'model/test-case';

import { slideInDownAnimation } from 'app/app.animations';

const BOOLEAN_FORMAT: (v: any) => any = (v: Date) => v.toDateString();

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'testlink-plugin-test-build',
    templateUrl: 'test-build.component.html',
    styleUrls: ['test-build.component.scss'],
    animations: [slideInDownAnimation],
})

export class TestBuildComponent implements OnInit, AfterViewInit {
    @Input('build') selectedBuild: IBuild;
    @Input('opened') opened: boolean;

    @HostBinding('@routeAnimation') routeAnimation: boolean = true;
    @HostBinding('class.td-route-animation') classAnimation: boolean = true;

    testCases: ITestCase[] = [];

    columns: ITdDataTableColumn[] = [
        { name: 'name', label: 'Test Case', sortable: true, filter: true, width: { min: 180, max: 250 } },
        { name: 'executionType', label: 'Platform', sortable: true, filter: true, },
        { name: 'platform', label: 'Priority', sortable: true, filter: true, },
        { name: 'executionStatus', label: 'Status', sortable: true, filter: true, },
    ];

    arePanelsOpen: boolean = true;
    filteredTestCases: ITestCase[];
    filteredTotal: number;
    selectedTestcase: ITestCase;
    sortBy: string = 'executionStatus';
    sortOrder: TdDataTableSortingOrder = TdDataTableSortingOrder.Descending;
    searchTerm: string = '';
    fromRow: number = 1;
    currentPage: number = 1;
    pageSize: number = 50;
    changeLog: string[] = [];
    isDialogOpen: boolean = false;

    constructor(private _dataTableService: TdDataTableService, private router: Router,
        private _changeDetectorRef: ChangeDetectorRef, public media: TdMediaService, ) { }

    ngOnInit(): void {
        this.filteredTestCases = this.testCases;
        this.filteredTotal = (this.testCases) ? this.testCases.length : 0;
        this.filter();
    }

    sort(sortEvent: ITdDataTableSortChangeEvent): void {
        this.sortBy = sortEvent.name;
        this.sortOrder = sortEvent.order;
        this.filter();
    }

    filter(): void {
        let newData: any[] = this.testCases;
        let excludedColumns: string[] = this.columns
            .filter((column: ITdDataTableColumn) => {
                return ((column.filter === undefined && column.hidden === true) ||
                    (column.filter !== undefined && column.filter === false));
            }).map((column: ITdDataTableColumn) => {
                return column.name;
            });
        newData = this._dataTableService.filterData(newData, this.searchTerm, true, excludedColumns);
        this.filteredTotal = (newData) ? newData.length : 0;
        if (newData) {
            newData = this._dataTableService.sortData(newData, this.sortBy, this.sortOrder);
            newData = this._dataTableService.pageData(newData, this.fromRow, this.currentPage * this.pageSize);
            this.testCases = newData;
        } else {
            this.testCases = [];
        }
    }

    goTest(): void {
        this.router.navigate(['testlink-plugin/run-test']);
    }

    ngAfterViewInit(): void {
        /* VERY IMPORTANT, DO NOT REMOVE THAT CODE (MdSidenav issues redrawing on re-calling) */
        setTimeout(() => {
            this.refreshView();
        });
    }

    private refreshView(): void {
        this.media.broadcast();
        this._changeDetectorRef.detectChanges();
    }

}
