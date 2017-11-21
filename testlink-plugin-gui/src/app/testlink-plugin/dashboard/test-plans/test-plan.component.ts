import {
    Component, OnInit, OnChanges, AfterViewInit, Input, HostBinding, ChangeDetectionStrategy,
    SimpleChange, ChangeDetectorRef, HostListener,
} from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { DatePipe } from '@angular/common';
import {
    TdLoadingService, TdDialogService, TdMediaService, TdDataTableService, TdDataTableSortingOrder,
    ITdDataTableSortChangeEvent, ITdDataTableColumn, IPageChangeEvent, TdDataTableComponent,
} from '@covalent/core';

import { ITdDynamicElementConfig, TdDynamicElement, TdDynamicType } from '@covalent/dynamic-forms';

import { slideInDownAnimation } from 'app/app.animations';
import { TestRunnerComponent } from '../test-runner/test-runner.component';
import { IBuild } from 'model/build';
import { ITestPlan } from 'model/test-plan';

import 'rxjs/add/operator/switchMap';

const BOOLEAN_FORMAT: (v: any) => any = (v: Date) => v.toDateString();

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'testlink-plugin-test-plan',
    templateUrl: 'test-plan.component.html',
    styleUrls: ['test-plan.component.scss'],
    animations: [slideInDownAnimation],
})

export class TestPlanComponent implements OnInit, AfterViewInit {
    @Input('plan') plans: ITestPlan;
    @Input('builds') builds: IBuild[];
    @Input('opened') opened: boolean;

    @HostBinding('@routeAnimation') routeAnimation: boolean = true;
    @HostBinding('class.td-route-animation') classAnimation: boolean = true;

    columns: ITdDataTableColumn[] = [
        { name: 'testSuitName', label: 'Test Suite', sortable: true, filter: true, },
        { name: 'testCase', label: 'Test Case', sortable: true, filter: true, width: { min: 180, max: 250 } },
        { name: 'platform', label: 'Platform', sortable: true, filter: true, },
        { name: 'priority', label: 'Priority', sortable: true, filter: true, },
        { name: 'status', label: 'Status', sortable: true, filter: true, },
        { name: 'assignedSince', label: 'Assigned since', sortable: true, filter: true, format: BOOLEAN_FORMAT, },
    ];
    actualWindowWidth: number;
    actualWindowHeight: number;

    arePanelsOpen: boolean = true;

    filteredBuilds: any[];
    filteredTotal: number;
    selectedBuild: string;
    sortBy: string = 'testSuitName';
    sortOrder: TdDataTableSortingOrder = TdDataTableSortingOrder.Descending;
    searchTerm: string = '';
    fromRow: number = 1;
    currentPage: number = 1;
    pageSize: number = 50;
    changeLog: string[] = [];
    isDialogOpen: boolean = false;

    constructor(private _dataTableService: TdDataTableService,
        private _changeDetectorRef: ChangeDetectorRef, public media: TdMediaService, private route: ActivatedRoute,
        private router: Router) { }

    ngOnInit(): void {
        this.filteredBuilds = this.builds;
        this.filteredTotal = this.builds.length;
        this.filter();
    }

    sort(sortEvent: ITdDataTableSortChangeEvent): void {
        this.sortBy = sortEvent.name;
        this.sortOrder = sortEvent.order;
        this.filter();
    }

    filter(): void {
        let newData: any[] = this.builds;
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
        this.filteredBuilds = newData;
    }

    goTest(): void {
        this.router.navigate(['testlink-plugin/run-test']);
    }

    ngAfterViewInit(): void {
        /* VERY IMPORTANT, DO NOT REMOVE THAT CODE (MdSidenav issues redrawing on re-calling) */
        setTimeout(() => {
            this.media.broadcast();
            this._changeDetectorRef.detectChanges();
        });
    }
}
