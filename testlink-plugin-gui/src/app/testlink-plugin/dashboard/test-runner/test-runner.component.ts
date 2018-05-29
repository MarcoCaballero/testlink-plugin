import { Component, Inject, OnInit, HostListener, HostBinding, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { MdAccordionDisplayMode } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';

import { StepState, TdStepComponent, TdMediaService, TdLoadingService, TdDialogService } from '@covalent/core';
import { TdTextEditorComponent } from '@covalent/text-editor';

import { Subscription } from 'rxjs/Subscription';

import { slideInDownAnimation } from '../../../app.animations';
import { ITestCase } from 'model/test-case';
import { IExecution } from 'model/execution';
import { IExecutionResponse } from 'model/execution-response';
import { ITestCaseStep } from 'model/step';
import { TestCaseService } from 'services/tlp-api/test-case.service';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'testlink-plugin-test-runner',
    templateUrl: 'test-runner.component.html',
    styleUrls: ['test-runner.component.scss'],
    animations: [slideInDownAnimation],
})
export class TestRunnerComponent implements OnInit, AfterViewInit {
    @HostBinding('@routeAnimation') routeAnimation: boolean = true;
    @HostBinding('class.td-route-animation') classAnimation: boolean = true;
    activeDeactiveStep1Msg: string = 'No select/deselect detected yet';

    platforms: string[] = [
    ];

    statusList: Object[] = [
        {
            title: 'PASSED',
            class: 'greened',
        },
        {
            title: 'FAILED',
            class: 'reded',
        },
        {
            title: 'BLOCKED',
            class: 'yellowed',
        },
        {
            title: 'NOT_RUN',
            class: 'greyed',
        },
    ];
    steps: ITestCaseStep[] = [];
    editorVal: string;
    failedOrBlocked: number = 0;
    selectedTestcase: ITestCase;
    testId: number;
    planId: number;
    buildId: number;
    platform: string;
    reportResult: string = 'NOT_RUN';
    execution: IExecution;
    executionResponse: IExecutionResponse;
    file: File = undefined;
    disabled: boolean = false;
    formdata: FormData;

    constructor(private _changeDetectorRef: ChangeDetectorRef, public media: TdMediaService,
        private router: Router, private activatedRouter: ActivatedRoute, private dialogService: TdDialogService,
        private testCaseService: TestCaseService, private loadingService: TdLoadingService) { }

    ngOnInit(): void {
        this.editorVal = `# Test result failures:`;
        this.activatedRouter.queryParams.subscribe((params: { platform: string, testbuild: any, testplan: any, testcase: any }) => {
            this.platform = (params.platform === 'Any') ? '' : params.platform;
            this.platforms = [`${params.platform}`];
            this.testId = parseInt(params.testcase, 10);
            this.planId = parseInt(params.testplan, 10);
            this.buildId = parseInt(params.testbuild, 10);
        });
        this.loadingService.register();
        this.getTestCase();
    }
    cancelEvent(): void {
        this.formdata = new FormData();
        this.file = undefined;
    }

    selectEvent(file: File): void {
        this.formdata = new FormData();
        this.file = file;
        this.formdata.append('file', file);
        console.log(`Form: ${JSON.stringify(this.formdata, undefined, 4)}`);
    }

    onSaveClick(): void {
        // this.dialogRef.close();
    }

    activeEvent(): void {
        this.activeDeactiveStep1Msg = 'Active event emitted.';
    }

    deactiveEvent(): void {
        this.activeDeactiveStep1Msg = 'Deactive event emitted.';
    }

    isError(title: string): boolean {
        return title === 'FAILED';
    }

    isBlocked(title: string): boolean {
        return title === 'BLOCKED';
    }

    stayNotRun(title: string): boolean {
        return title === 'NOT_RUN';
    }

    checkStatus(value: any): void {
        let preEditoValue: string = '## Report result\n';
        this.steps.forEach((step: any): void => {
            if (this.isError(step.status) || this.isBlocked(step.status)) {
                preEditoValue += `* ### step id: ${step.number} - status: ${step.status} \n > Add bug info there ... \n\n\n`;
            }
        });
        preEditoValue += `## Final result to report: ${this.reportResult}\n Add some info about the bug.... \n\n`;
        this.editorVal = preEditoValue;
        this.refreshView();
    }

    existReport(): boolean {
        let status: boolean = false;
        this.steps.forEach((step: any): void => {
            if (this.isError(step.status) || this.isBlocked(step.status)) {
                status = true;
            }
        });
        if (!this.stayNotRun(this.reportResult)) {
            status = true;
        }
        return status;
    }

    sendResult(): void {
        if (this.reportResult === 'NOT_RUN') {
            this.openAlert();
        } else {
            this.dialogService.openConfirm({
                message: 'Are you sure you want to send the result?',
                title: 'Confirm',
                cancelButton: 'Cancel',
                acceptButton: 'Yes',
            }).afterClosed().subscribe((accept: boolean) => {
                if (accept) {
                    console.log('Result sending');
                    this.execution = {
                        id: this.testId,
                        testPlanId: this.planId,
                        buildId: this.buildId,
                        platformName: this.platform,
                        version: this.selectedTestcase.version,
                        notes: this.editorVal,
                        executionStatusChar: this.getExecutionStatusChar(this.reportResult),
                    };
                    this.sendExecutionResult(this.execution);
                    this.loadingService.register();
                    console.log(`Send Execution: ${JSON.stringify(this.execution, undefined, 4)}`);
                } else {
                    console.log('Result NOT sending');
                }
            });
        }
    }

    async goBack(willAsk: boolean = true): Promise<void> {
        if (willAsk) {
            this.dialogService.openConfirm({
                message: 'All non saved data will be lost, continue ?',
                title: 'Confirm',
                cancelButton: 'No',
                acceptButton: 'Yes',
            }).afterClosed().subscribe((accept: boolean) => {
                if (accept) {
                    this.router.navigate(['/testlink-plugin/dashboard']);
                }
            });
        } else {
            this.router.navigate(['/testlink-plugin/dashboard']);
        }
    }

    getBackground(i: number): string {
        return (i % 2 === 0) ? 'white' : '#ffac2f1a';
    }

    getStatusIcon(value: any): string[] {
        let icon: string[];
        switch (value) {
            case 'FAILED':
                icon = ['error_outline', 'reded'];
                break;
            case 'BLOCKED':
                icon = ['block', 'yellowed'];
                break;
            case 'PASSED':
                icon = ['check_circle', 'greened'];
                break;
            default:
                icon = ['new_releases', 'greyed'];
                break;
        }
        return icon;
    }

    ngAfterViewInit(): void {
        /* VERY IMPORTANT, DO NOT REMOVE THAT CODE (MatSidenav issues redrawing on re-calling) */
        setTimeout(() => {
            this.refreshView();
        });
    }

    openAlert(): void {
        this.dialogService.openAlert({
            message: 'You didn\'t set the Test Result, NOT_RUN is not available to report',
            title: 'Invalid Report',
            closeButton: 'Ok',
        });
    }

    private getExecutionStatusChar(status: string): string {
        return status.slice(0, 1).toLowerCase();
    }

    private refreshView(): void {
        this.media.broadcast();
        this._changeDetectorRef.detectChanges();
    }

    private getTestCase(): any {
        this.testCaseService.getTestCaseByPlatform(this.planId, this.buildId, this.testId, this.platform)
            .then((response: ITestCase) => {
                this.selectedTestcase = response;
                this.steps = this.selectedTestcase.steps;
                this.setInitialStepStatus();
                this.refreshView();
                this.loadingService.resolve();
            })
            .catch((error: any) => {
                console.log(`Error when trying to get test plan: ${error}`);
            });
    }

    private setInitialStepStatus(): void {
        this.steps.forEach((step: ITestCaseStep) => {
            step.status = 'NOT_RUN';
        });
    }

    private sendExecutionResult(execution: IExecution): void {
        this.testCaseService.postExecutionResult(execution)
            .then((response: IExecutionResponse) => {
                this.executionResponse = response;
                this.loadingService.resolve();
                if (this.file !== undefined) {
                    this.sendAttachment(this.formdata, this.executionResponse.executionId);
                } else {
                    this.openSentAlert();
                }
            })
            .catch((error: any) => {
                this.loadingService.resolve();
                this.dialogService.openConfirm({
                    message: 'Something went wrong when trying to send the result, try again?',
                    title: 'Error',
                    cancelButton: 'No',
                    acceptButton: 'Yes',
                }).afterClosed().subscribe((accept: boolean) => {
                    if (accept) {
                        this.sendExecutionResult(execution);
                    }
                });
            });
    }

    private sendAttachment(formdata: FormData, executionId: number): void {
        this.testCaseService.uploadAttachment(formdata, executionId)
            .then((response: any) => {
                this.openSentAlert();
            })
            .catch((error: any) => {
                this.loadingService.resolve();
                this.dialogService.openConfirm({
                    message: 'Something went wrong when trying to send the attachment, try again?',
                    title: 'Error',
                    cancelButton: 'No',
                    acceptButton: 'Yes',
                }).afterClosed().subscribe((accept: boolean) => {
                    if (accept) {
                        this.sendAttachment(formdata, executionId);
                    }
                });
            });
    }

    private openSentAlert(): void {
        this.dialogService.openAlert({
            message: `The test case was sent, with the following response: ${this.executionResponse.message}`,
            title: 'Test Case Result',
            closeButton: 'Ok',
        });
        this.goBack(false);
    }
}
