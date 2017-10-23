import { Component, Inject, OnInit } from '@angular/core';
import { MdDialog, MD_DIALOG_DATA, MdDialogRef, MdAccordionDisplayMode } from '@angular/material';

import { StepState, TdStepComponent } from '@covalent/core';

@Component({
    selector: 'testlink-plugin-test-runner-dialog',
    templateUrl: 'test-runner-dialog.component.html',
})
export class TestRunnerDialogComponent implements OnInit {
    filteringAsync: boolean = false;
    activeDeactiveStep1Msg: string = 'No select/deselect detected yet';
    selectedStatus: string;
    data: any[] = [];
    status: Object[] = [
        'PASSED',
        'FAILED',
        'BLOCKED',
        'NOT_RUN',
    ];
    testedBy: string[] = [
        'Admin',
        'Pep Serrat',
        'Maria Gonzalez',
        'Carles Garcia',
        'need more?',
    ];

    steps: any[] = [
        {
            id: 0,
            state: StepState.None,
            description: 'go to http://youtube.com',
            expected: 'displays index.html page',
            isActive: true,
            status: 'NOT_RUN',
        }, {
            id: 1,
            state: StepState.None,
            description: 'go to http://youtube.com/step1',
            expected: 'displays step1.html page',
            isActive: false,
            status: 'NOT_RUN',
        },
        {
            id: 2,
            state: StepState.None,
            description: 'go to http://youtube.com/step2',
            expected: 'displays step2.html page',
            isActive: false,
            status: 'NOT_RUN',
        },
    ];

    asyncModel: string[] = this.testedBy.slice(0, 3);
    windowHeight: number;

    constructor(public dialogRef: MdDialogRef<TestRunnerDialogComponent>, @Inject(MD_DIALOG_DATA) public dataService: any) {

    }

    ngOnInit(): void {
        this.windowHeight = this.dataService.height;
        for (let index: number = 1; index <= 1500; index++) {
            this.data.push({ index: index, name: 'element-' + index });
        }
    }

    onSaveClick(): void {
        this.dialogRef.close();
    }

    activeEvent(): void {
        this.activeDeactiveStep1Msg = 'Active event emitted.';
    }

    deactiveEvent(): void {
        this.activeDeactiveStep1Msg = 'Deactive event emitted.';
    }

}
