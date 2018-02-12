import { Component, OnInit, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import {
    TdLoadingService, TdDialogService, TdMediaService, TdDataTableService, TdDataTableSortingOrder,
    ITdDataTableSortChangeEvent, ITdDataTableColumn, IPageChangeEvent, LoadingType, LoadingMode,
} from '@covalent/core';

import { TestProjectService } from '../services/tlp-api/test-projects.service';
import { TestPlanService } from '../services/tlp-api/test-plan.service';
import { BuildService } from '../services/tlp-api/build.service';
import { IProject } from '../model/project';
import { ITestPlan } from '../model/test-plan';
import { IBuild } from '../model/build';

const BOOLEAN_FORMAT: (v: any) => any = (v: boolean) => (v === true) ? 'ENABLED' : 'NOT ENABLED';

@Component({
    changeDetection: ChangeDetectionStrategy.Default,
    selector: 'testlink-plugin-dashboard',
    templateUrl: 'dashboard.component.html',
    styleUrls: ['dashboard.component.scss'],
})

export class DashboardComponent implements OnInit, AfterViewInit {

    isInitContext: boolean = true;
    menuItems: Object[] = [
        {
            icon: 'home',
            route: '.',
            title: 'Home',
        },
    ];
    columns: ITdDataTableColumn[] = [
        { name: 'name', label: 'Project name', sortable: true, filter: true, width: 150 },
        { name: 'description', label: 'Description', sortable: true, filter: true, width: 300 },
        { name: 'prefix', label: 'Prefix', sortable: true, filter: true, width: 50 },
        { name: 'issue tracker', label: 'issues tracker', sortable: true, filter: true, hidden: true },
        { name: 'isEnabledRequirements', label: 'Requirement', sortable: true, filter: true, width: 100 },
        { name: 'isActive', label: '¿is active?', sortable: true, filter: true, width: 100 },
        { name: 'isPublic', label: '¿is public?', sortable: true, filter: true, width: 100 },
    ];
    projects: IProject[] = [];
    selectedProject: IProject = undefined;
    testplans: ITestPlan[] = [];
    selectedTestPlan: ITestPlan = undefined;
    builds: IBuild[] = undefined;
    searchTerm: string = '';
    opened: boolean = false;
    optionalText: string = (!this.opened) ? 'Open All' : 'Close all';

    constructor(private _changeDetectorRef: ChangeDetectorRef, public media: TdMediaService,
        private _dataTableService: TdDataTableService, private loadingService: TdLoadingService,
        private testProjectService: TestProjectService, private testPlanService: TestPlanService,
        private buildService: BuildService) {
    }

    ngOnInit(): void {
        this.loadContext();
    }

    public async loadContext(): Promise<void> {
        this.loadingService.register('projectsLoader');
        this.loadingService.register();
        this.setInitialProjects();
    }

    change(plan: ITestPlan): void {
        if (plan) {
            this.selectedTestPlan = plan;
            console.log(`Changed test-plan: ${JSON.stringify(this.selectedTestPlan, undefined, 4)}`);
            this.loadingService.register('buildsLoader');
            this.setTestBuilds(plan.id);
        }

    }

    public changeSelectedProject(project: IProject): void {
        this.resetCssStyle();
        this.selectedProject = project;
        this.aplyCssStyle();
        this.loadingService.register('testPlanLoader');
        this.setTestPlans(project.id);
    }

    ngAfterViewInit(): void {
        /* VERY IMPORTANT, DO NOT REMOVE THAT CODE (MdSidenav issues redrawing on re-calling) */
        setTimeout(() => {
            this.refreshView();
        });
    }

    toggleOpened(): void {
        this.opened = !this.opened;
        this.optionalText = (!this.opened) ? 'Open All' : 'Close all';
        console.log(`opened: ${this.opened}`);
    }

    private setInitialProjects(): any {
        this.testProjectService.getProjects()
            .then((response: IProject[]) => {
                this.projects = response;
                console.log(`Projects loaded on set projects: ${JSON.stringify(this.projects, undefined, 4)}`);
                if (response.length > 0) {
                    this.resetCssStyle();
                    this.selectedProject = response[0];
                    this.aplyCssStyle();
                    this.loadingService.resolve('projectsLoader');
                    this.loadingService.register('testPlanLoader');
                    this.setTestPlans(response[0].id);
                    this.refreshView();
                } else {
                    this.loadingService.resolve();
                }
            })
            .catch((error: any) => {
                console.log(`Error when trying to get test plan: ${error}`);
            });
    }

    private setTestPlans(projectId: number): any {
        this.testPlanService.getPlans(projectId)
            .then((response: ITestPlan[]) => {
                this.testplans = response;
                console.log(`Projects loaded on set testplans: ${JSON.stringify(this.testplans, undefined, 4)}`);
                if (response.length > 0) {
                    this.selectedTestPlan = response[0];
                    this.loadingService.register('buildsLoader');
                    this.setTestBuilds(response[0].id);
                } else {
                    this.selectedTestPlan = undefined;
                    this.builds = [];
                    this.loadingService.resolve();
                }
                this.refreshView();
                this.loadingService.resolve('testPlanLoader');
            })
            .catch((error: any) => {
                console.log(`Error when trying to get test plan: ${error}`);
            });
    }

    private setTestBuilds(testPlanId: number): any {
        this.buildService.getBuilds(testPlanId)
            .then((response: IBuild[]) => {
                this.builds = response;
                console.log(`Projects loaded on set builds: ${JSON.stringify(this.builds, undefined, 4)}`);
                this.refreshView();
                this.loadingService.resolve('buildsLoader');
                this.loadingService.resolve();
            })
            .catch((error: any) => {
                console.log(`Error when trying to get build: ${error}`);
            });
    }

    private refreshView(): void {
        this.media.broadcast();
        this._changeDetectorRef.detectChanges();
    }

    private aplyCssStyle(): void {
        this.selectedProject.bgcolor = '#ffac2f';
        this.selectedProject.color = 'white';
    }

    private resetCssStyle(): void {
        if (this.selectedProject) {
            this.selectedProject.color = '';
            this.selectedProject.bgcolor = '';
        }
    }
}
