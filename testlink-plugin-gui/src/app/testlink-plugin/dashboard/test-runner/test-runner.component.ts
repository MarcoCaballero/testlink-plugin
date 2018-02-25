import { Component, Inject, OnInit, HostListener, HostBinding, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { MdAccordionDisplayMode } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';

import { StepState, TdStepComponent, TdMediaService, TdLoadingService, TdDialogService } from '@covalent/core';
import { TdTextEditorComponent } from '@covalent/text-editor';

import { Subscription } from 'rxjs/Subscription';

import { slideInDownAnimation } from '../../../app.animations';
import { ITestCase } from 'model/test-case';
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

    constructor(private _changeDetectorRef: ChangeDetectorRef, public media: TdMediaService,
        private router: Router, private activatedRouter: ActivatedRoute, private dialogService: TdDialogService,
        private testCaseService: TestCaseService, private loadingService: TdLoadingService) { }

    ngOnInit(): void {
        this.editorVal = `# Test result failures:`;
        this.activatedRouter.queryParams.subscribe((params: { platform: string, testbuild: any, testplan: any, testcase: any }) => {
            this.platform = (params.platform === 'Any') ? '' : params.platform;
            this.platforms = [`${params.platform}`];
            this.testId = params.testcase;
            this.planId = params.testplan;
            this.buildId = params.testbuild;
        });
        this.loadingService.register();
        this.getTestCase();
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

    checkStatus(value: any): void {
        let preEditoValue: string = '## Report result\n';
        this.steps.forEach((step: any): void => {
            if (this.isError(step.status) || this.isBlocked(step.status)) {
                preEditoValue += `* ### step id: ${step.number} - status: ${step.status} \n > Add bug info there ... \n\n\n`;
            }
        });
        if (this.isError(this.reportResult) || this.isBlocked(this.reportResult)) {
            preEditoValue += `## Final result to report: ${this.reportResult}\n Add some info about the bug.... \n\n`;
        }
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
        if (this.isError(this.reportResult) || this.isBlocked(this.reportResult)) {
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
                } else {
                    console.log('Result NOT sending');
                }
            });
        }
    }

    async goBack(): Promise<void> {
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
    }

    getBackground(i: number): string {
        return (i % 2 === 0) ? '#dedede40' : '#ffac2f45';
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
}
