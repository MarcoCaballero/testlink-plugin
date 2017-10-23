import { Component, Inject } from '@angular/core';
import { MdDialog, MD_DIALOG_DATA, MdDialogRef } from '@angular/material';

import { StepState } from '@covalent/core';

@Component({
    selector: 'testlink-plugin-test-runner-dialog',
    templateUrl: 'test-runner-dialog.component.html',
})
export class TestRunnerDialogComponent {
    filteringAsync: boolean = false;
    activeDeactiveStep1Msg: string = 'No select/deselect detected yet';

    testedBy: string[] = [
        'Admin',
        'Pep Serrat',
        'Maria Gonzalez',
        'Carles Garcia',
        'need more?',
    ];

    steps: Object[] = [
        {
            id: 0,
            state: StepState.None,
            description: 'go to http://youtube.com',
            expected: 'displays index.html page',
        }, {
            id: 1,
            state: StepState.None,
            description: 'go to http://youtube.com/step1',
            expected: 'displays step1.html page',
        },
        {
            id: 2,
            state: StepState.None,
            description: 'go to http://youtube.com/step2',
            expected: 'displays step2.html page',
        },
    ];

    asyncModel: string[] = this.testedBy.slice(0, 3);

    constructor(public dialogRef: MdDialogRef<TestRunnerDialogComponent>, @Inject(MD_DIALOG_DATA) public data: any) { }

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
