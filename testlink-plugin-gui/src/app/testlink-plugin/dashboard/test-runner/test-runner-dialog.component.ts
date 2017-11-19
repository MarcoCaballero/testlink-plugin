import { Component, Inject, OnInit, HostBinding } from '@angular/core';
import { MdDialog, MD_DIALOG_DATA, MdDialogRef, MdAccordionDisplayMode } from '@angular/material';
import { StepState, TdStepComponent } from '@covalent/core';

import { TdTextEditorComponent } from '@covalent/text-editor';

import { slideInDownAnimation } from '../../../app.animations';

@Component({
    selector: 'testlink-plugin-test-runner-dialog',
    templateUrl: 'test-runner-dialog.component.html',
    animations: [slideInDownAnimation],
})
export class TestRunnerDialogComponent implements OnInit {
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
            id: 2,
            state: StepState.None,
            description: 'go to http://youtube.com/step2',
            expected: 'displays step2.html page  looking the side middle of the applicaion web sockket dumb content',
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
            id: 2,
            state: StepState.None,
            description: 'go to http://youtube.com/step2',
            expected: 'displays step2.html page  looking the side middle of the applicaion web sockket dumb content',
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
            id: 2,
            state: StepState.None,
            description: 'go to http://youtube.com/step2',
            expected: 'displays step2.html page  looking the side middle of the applicaion web sockket dumb content',
            isActive: false,
            status: 'NOT_RUN',
        },
        {
            id: 100,
            state: StepState.None,
            description: 'go to http://youtube.com/step2',
            expected: 'displays step2.html page  looking the side middle of the applicaion web sockket dumb content',
            isActive: false,
            status: 'NOT_RUN',
        },
    ];
    editorVal: string = `# Intro
    Go ahead, play around with the editor! Be sure to check out **bold** and *italic* styling, or even [links](https://google.com).
    You can type the Markdown syntax, use the toolbar, or use shortcuts like 'cmd-b' or 'ctrl-b'.
    ## Lists
    Unordered lists can be started using the toolbar or by typing '* ', '- ', or '+ '. Ordered lists can be started by typing '1. '.
    #### Unordered
    * Lists are a piece of cake
    * They even auto continue as you type
    * A double enter will end them
    * Tabs and shift-tabs work too
    #### Ordered
    1. Numbered lists...
    2. ...work too!
    ## What about images?
    ![Yes](https://i.imgur.com/sZlktY7.png)
    `;

    options: any = {
        lineWrapping: true,
        toolbar: true,
    };

    asyncModel: string[] = this.testedBy.slice(0, 3);
    windowHeight: number;


    constructor(public dialogRef: MdDialogRef<TestRunnerDialogComponent>, @Inject(MD_DIALOG_DATA) public dataService: any) {

    }

    ngOnInit(): void {
        this.windowHeight = this.dataService.height;
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

    isError(title: string): boolean {
        return title === 'FAILED';
    }
    isBlocked(title: string): boolean {
        return title === 'BLOCKED';
    }
}
