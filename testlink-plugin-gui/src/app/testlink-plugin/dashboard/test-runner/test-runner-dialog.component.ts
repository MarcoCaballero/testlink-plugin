import { Component, Inject } from '@angular/core';
import { MdDialog, MD_DIALOG_DATA, MdDialogRef } from '@angular/material';

@Component({
    selector: 'testlink-plugin-test-runner-dialog',
    templateUrl: 'test-runner-dialog.component.html',
})
export class TestRunnerDialogComponent {
    constructor(public dialogRef: MdDialogRef<TestRunnerDialogComponent>, @Inject(MD_DIALOG_DATA) public data: any) { }

    onSaveClick(): void {
        this.dialogRef.close();
    }
}
