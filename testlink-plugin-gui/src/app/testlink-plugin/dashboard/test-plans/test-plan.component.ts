import {
    Component, OnInit, OnChanges, AfterViewInit, Input, HostBinding, ChangeDetectionStrategy,
    SimpleChange, ChangeDetectorRef, HostListener,
} from '@angular/core';
import { DatePipe } from '@angular/common';
import {
    TdLoadingService, TdDialogService, TdMediaService, TdDataTableService, TdDataTableSortingOrder,
    ITdDataTableSortChangeEvent, ITdDataTableColumn, IPageChangeEvent, TdDataTableComponent,
} from '@covalent/core';

import { ITdDynamicElementConfig, TdDynamicElement, TdDynamicType } from '@covalent/dynamic-forms';

import { MdDialog, MdDialogRef, DialogPosition } from '@angular/material';

import { slideInDownAnimation } from 'app/app.animations';
import { IBuild } from 'model/build';
import { TestRunnerDialogComponent } from '../test-runner/test-runner-dialog.component';

const BOOLEAN_FORMAT: (v: any) => any = (v: Date) => v.toDateString();
const SIZE_MODIFICATOR: number = 0.9;

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'testlink-plugin-test-plan',
    templateUrl: 'test-plan.component.html',
    styleUrls: ['test-plan.component.scss'],
    animations: [slideInDownAnimation],
})

export class TestPlanComponent implements OnInit, AfterViewInit {
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
    dialogRef: MdDialogRef<TestRunnerDialogComponent>;

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

    constructor(private _dataTableService: TdDataTableService, private dialogService: TdDialogService,
        private _changeDetectorRef: ChangeDetectorRef, public media: TdMediaService, public mdDialogService: MdDialog, ) { }

    @HostListener('window:resize', ['$event'])
    onResize(event: any): void {
        this.actualWindowWidth = event.target.innerWidth;
        this.actualWindowHeight = event.target.innerHeight;
        if (this.isDialogOpen) {
            this.updateDialogSize();
        }
    }

    ngOnInit(): void {
        this.actualWindowWidth = window.innerWidth;
        this.actualWindowHeight = window.innerHeight;
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

    showAlert(event: any): void {
        this.isDialogOpen = true;
        this.dialogRef = this.mdDialogService.open(TestRunnerDialogComponent, {
            width: `${this.getProperSize(this.actualWindowWidth)}px`,
            height: `${this.getProperSize(this.actualWindowHeight)}px`,
            data: {
                project: event.row.project,
                testSuitName: event.row.testSuitName,
                height: this.actualWindowHeight,
            },
            panelClass: 'testlink-no-padding',
        });
        this.updateDialogSize();
        this.dialogRef.afterClosed().subscribe((result: any): void => {
            console.log(`Dialog result: ${result} `);
            this.isDialogOpen = false;
        });
    }

    updateDialogSize(): void {
        this.dialogRef.updatePosition({ top: `${(this.actualWindowHeight * 0.05)}px`, left: `${this.actualWindowWidth * 0.1}px` });
        this.dialogRef.updateSize(`${this.getProperSize(this.actualWindowWidth)}px`, `${this.getProperSize(this.actualWindowHeight)}px`);
    }

    getProperSize(size: number): number {
        return size * SIZE_MODIFICATOR;
    }

    ngAfterViewInit(): void {
        /* VERY IMPORTANT, DO NOT REMOVE THAT CODE (MdSidenav issues redrawing on re-calling) */
        setTimeout(() => {
            this.media.broadcast();
            this._changeDetectorRef.detectChanges();
        });
    }
}
