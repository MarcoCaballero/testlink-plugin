import {
    Component, OnInit, AfterViewInit, EventEmitter, ChangeDetectorRef,
    ChangeDetectionStrategy, HostBinding, Input, Output,
} from '@angular/core';
import {
    ITdDataTableColumn, TdDataTableSortingOrder, TdMediaService, TdDataTableService,
    ITdDataTableSortChangeEvent, TdLoadingService, IPageChangeEvent,
} from '@covalent/core';
import { Router } from '@angular/router';

import { slideInDownAnimation } from 'app/app.animations';
import { TestRunnerComponent, } from '../test-runner/test-runner.component';
import { IBuild } from 'model/build';
import { ITestPlan } from 'model/test-plan';
import { ITestCase } from 'model/test-case';
import { TestCaseService } from 'services/tlp-api/test-case.service';

const BOOLEAN_FORMAT: (v: any) => any = (v: Date) => v.toDateString();

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'testlink-plugin-test-build',
    templateUrl: 'test-build.component.html',
    styleUrls: ['test-build.component.scss'],
    animations: [slideInDownAnimation],
})

export class TestBuildComponent implements OnInit, AfterViewInit {
    private _searchTerm: any = '';
    @Input('build') selectedBuild: IBuild;
    @Input('plan') selectedTestPlan: ITestPlan;
    @Input('opened') opened: boolean;
    @Input()
    set searchTerm(searchTerm: string) {
        this._searchTerm = searchTerm;
        this.filter();
    }
    @Output() onTestCaseChanges: any = new EventEmitter<number>();

    @HostBinding('@routeAnimation') routeAnimation: boolean = true;
    @HostBinding('class.td-route-animation') classAnimation: boolean = true;

    testCases: ITestCase[] = [];

    columns: ITdDataTableColumn[] = [
        { name: 'icon', label: '', width: 100 },
        { name: 'name', label: 'Test Case', sortable: true, filter: true, width: { min: 180, max: 250 } },
        { name: 'fullExternalId', label: 'External ID', sortable: true, filter: true, },
        { name: 'executionType', label: 'Execution Type', sortable: true, filter: true, },
        { name: 'platform.name', label: 'Platform', sortable: false, filter: true, },
        { name: 'version', label: 'Version', sortable: true, filter: true, },
        { name: 'executionStatus', label: 'Status', sortable: true, filter: true, },
    ];

    arePanelsOpen: boolean = true;
    filteredTestCases: ITestCase[];
    filteredTotal: number;
    sortBy: string = 'executionStatus';
    sortOrder: TdDataTableSortingOrder = TdDataTableSortingOrder.Descending;
    fromRow: number = 1;
    currentPage: number = 1;
    pageSize: number = 50;
    changeLog: string[] = [];
    isDialogOpen: boolean = false;

    constructor(private _dataTableService: TdDataTableService, private router: Router,
        private _changeDetectorRef: ChangeDetectorRef, public media: TdMediaService,
        private testCaseService: TestCaseService, private loadingService: TdLoadingService) { }

    ngOnInit(): void {
        this.setTestCases();
    }

    sort(sortEvent: ITdDataTableSortChangeEvent): void {
        console.log('sorting');
        this.sortBy = sortEvent.name;
        this.sortOrder = sortEvent.order;
        this.filter();
    }

    page(pagingEvent: IPageChangeEvent): void {
        this.fromRow = pagingEvent.fromRow;
        this.currentPage = pagingEvent.page;
        this.pageSize = pagingEvent.pageSize;
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
        newData = this._dataTableService.filterData(newData, this._searchTerm, true, excludedColumns);
        this.filteredTotal = newData.length;
        newData = this._dataTableService.sortData(newData, this.sortBy, this.sortOrder);
        newData = this._dataTableService.pageData(newData, this.fromRow, this.currentPage * this.pageSize);
        this.filteredTestCases = newData;
    }

    goTest(value: any): void {
        this.router.navigate(['testlink-plugin/run-test'], {
            queryParams:
            {
                platform: value.row.platform.name,
                testplan: this.selectedTestPlan.id,
                testbuild: this.selectedBuild.id,
                testcase: value.row.id,
            },
        });
    }

    ngAfterViewInit(): void {
        /* VERY IMPORTANT, DO NOT REMOVE THAT CODE (MdSidenav issues redrawing on re-calling) */
        setTimeout(() => {
            this.refreshView();
        });
    }

    private setTestCases(): any {
        this.testCaseService.getTestCases(this.selectedTestPlan.id, this.selectedBuild.id)
            .then((response: ITestCase[]) => {
                this.testCases = response;
                console.log(`send emit: ${this.testCases.length}`);
                this.onTestCaseChanges.emit(this.testCases.length);
                this.setUndefPlatforms();
            })
            .catch((error: any) => {
                console.log(`Error when trying to get test plan: ${error}`);
            });
    }

    private setUndefPlatforms(): void {
        for (let testcase of this.testCases) {
            testcase.platform.name = (testcase.platform.name === '') ? 'Any' : testcase.platform.name;
            testcase.icon = '../assets/icons/ic_note_black_24dp_1x.png';
        }
        this.filteredTestCases = this.testCases;
        this.filteredTotal = (this.testCases) ? this.testCases.length : 0;
        this.filter();
    }

    private refreshView(): void {
        this.media.broadcast();
        this._changeDetectorRef.detectChanges();
    }

}
