import { Component, Inject, OnInit, HostListener, HostBinding, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { MdAccordionDisplayMode } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';

import { StepState, TdStepComponent, TdMediaService, TdLoadingService, LoadingType, LoadingMode } from '@covalent/core';
import { TdTextEditorComponent } from '@covalent/text-editor';

import { Subscription } from 'rxjs/Subscription';

import { slideInDownAnimation } from '../../../app.animations';
import { ITestCase } from 'model/test-case';
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
    filteringAsync: boolean = false;
    activeDeactiveStep1Msg: string = 'No select/deselect detected yet';
    selectedStatus: string;
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
            description: 'go to http://youtube.com/step1 looking the side middle of the applicaion web sockket dumb content',
            expected: 'displays step1.html page',
            isActive: false,
            status: 'NOT_RUN',
        },
        {
            id: 2,
            state: StepState.None,
            description: 'go to http://youtube.com/step2',
            expected: 'displays step2.html page  looking the side middle of the applicaion web sockket dumb content',
            isActive: false,
            status: 'NOT_RUN',
        },
        {
            id: 3,
            state: StepState.None,
            description: 'go to http://youtube.com/step3',
            expected: 'displays step3.html page  looking the side middle of the applicaion web sockket dumb content',
            isActive: false,
            status: 'NOT_RUN',
        },
    ];

    navmenu: Object[] = [{
        icon: 'looks_one',
        route: '.',
        title: 'First item',
        description: 'Item description',
    }, {
        icon: 'looks_two',
        route: '.',
        title: 'Second item',
        description: 'Item description',
    }, {
        icon: 'looks_3',
        route: '.',
        title: 'Third item',
        description: 'Item description',
    },
    ];

    editorVal: string;

    options: any = {
        lineWrapping: true,
        toolbar: true,
    };

    asyncModel: string[] = this.testedBy.slice(0, 3);
    failedOrBlocked: number = 0;
    selectedTestcase: ITestCase;
    testId: number;
    planId: number;
    buildId: number;
    platform: string;

    constructor(private _changeDetectorRef: ChangeDetectorRef, public media: TdMediaService,
        private router: Router, private activatedRouter: ActivatedRoute,
        private testCaseService: TestCaseService, ) { }

    ngOnInit(): void {
        this.editorVal = `# Test result failures:`;
        this.activatedRouter.queryParams.subscribe((params: { platform: string, testbuild: any, testplan: any, testcase: any }) => {
            this.platform = params.platform;
            this.testId = params.testcase;
            this.planId = params.testplan;
            this.buildId = params.testbuild;
        });
        console.log(`Received: plan: ${this.planId}, build: ${this.buildId}, platform: ${this.platform}`);
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
        let status: number = 0;
        let preEditoValue: string = '## Bug Info\n';
        this.steps.forEach((step: any): void => {
            if (this.isError(step.status) || this.isBlocked(step.status)) {
                console.log(`st value: ${step.id} + ${step.status} \n`);
                status++;
                preEditoValue += `* ### step id: ${step.id} - status: ${step.status} \n > Add bug info there ... \n\n\n`;
            }
        });
        console.log(`preValue: ${preEditoValue}`);
        this.editorVal = preEditoValue;
    }

    existReport(): boolean {
        let status: boolean = false;
        this.steps.forEach((step: any): void => {
            if (this.isError(step.status) || this.isBlocked(step.status)) {
                status = true;
            }
        });
        return status;
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
            this.media.broadcast();
            this._changeDetectorRef.detectChanges();
        });
    }
}
