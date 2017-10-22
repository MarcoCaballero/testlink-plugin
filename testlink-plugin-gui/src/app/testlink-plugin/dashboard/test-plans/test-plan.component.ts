import { Component, OnInit, OnChanges, AfterViewInit, Input, ViewChild, SimpleChange, ChangeDetectorRef } from '@angular/core';
import { DatePipe } from '@angular/common';
import {
    TdLoadingService, TdDialogService, TdMediaService, TdDataTableService, TdDataTableSortingOrder,
    ITdDataTableSortChangeEvent, ITdDataTableColumn, IPageChangeEvent, TdDataTableComponent,
} from '@covalent/core';

import { ITdDynamicElementConfig, TdDynamicElement, TdDynamicType } from '@covalent/dynamic-forms';

import { IBuild } from 'model/build';

const BOOLEAN_FORMAT: (v: any) => any = (v: Date) => v.toDateString();

@Component({
    selector: 'testlink-plugin-test-plan',
    templateUrl: 'test-plan.component.html',
    styleUrls: ['test-plan.component.scss'],
})

export class TestPlanComponent implements OnInit, OnChanges, AfterViewInit {
    @ViewChild('dataTable') dataTableComponent: TdDataTableComponent;
    @Input('builds') builds: IBuild[];

    columns: ITdDataTableColumn[] = [
        { name: 'testSuitName', label: 'Test Suite', sortable: true, filter: true },
        { name: 'testCase', label: 'Test Case', sortable: true, filter: true },
        { name: 'platform', label: 'Platform', sortable: true, filter: true },
        { name: 'priority', label: 'Priority', sortable: true, filter: true, hidden: true },
        { name: 'status', label: 'Status', sortable: true, filter: true },
        { name: 'assignedSince', label: 'Assigned since', sortable: true, filter: true, format: BOOLEAN_FORMAT },
    ];

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

    constructor(private _dataTableService: TdDataTableService, private dialogService: TdDialogService,
        private _changeDetectorRef: ChangeDetectorRef, public media: TdMediaService) { }

    ngOnInit(): void {
        console.log(`input: ${JSON.stringify(this.builds)}`);
        this.filteredBuilds = this.builds;
        this.filteredTotal = this.builds.length;
        this.filter();
    }

    ngOnChanges(changes: { [propKey: string]: SimpleChange }): void {
        let log: string[] = [];
        for (let propName in changes) {
            let changedProp: any = changes[propName];
            let to: any = JSON.stringify(changedProp.currentValue);
            if (changedProp.isFirstChange()) {
                log.push(`Initial value of ${propName} set to ${to}`);
            } else {
                let from: any = JSON.stringify(changedProp.previousValue);
                log.push(`${propName} changed from ${from} to ${to}`);
            }
        }
        this.changeLog.push(log.join(', '));
    }

    sort(sortEvent: ITdDataTableSortChangeEvent): void {
        this.sortBy = sortEvent.name;
        this.sortOrder = sortEvent.order;
        this.filter();
    }

    filter(): void {
        this.dataTableComponent.refresh();
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
        this.dialogService.openAlert({
            message: 'You clicked on row: ' + event.row.testSuitName,
        });
    }

    ngAfterViewInit(): void {
        /* VERY IMPORTANT, DO NOT REMOVE THAT CODE (MdSidenav issues redrawing on re-calling) */
        setTimeout(() => {
            this.media.broadcast();
            this._changeDetectorRef.detectChanges();
        });
    }
}
