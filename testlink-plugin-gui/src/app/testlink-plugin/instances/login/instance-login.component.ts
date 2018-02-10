import { Component, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { TdMediaService, TdDialogService, TdLoadingService, LoadingType, LoadingMode } from '@covalent/core';
import { ITdDynamicElementConfig, TdDynamicElement, TdDynamicType } from '@covalent/dynamic-forms';

import { Subscription } from 'rxjs/Subscription';

import { IInstance } from '../../model/instance';
import { IProject } from '../../model/project';
import { IConnectionHeader } from '../../model/connection-header';
import { InstancesService } from '../../services/instances.service';
import { LocalStorageManagerService } from '../../services/local-storage-manager.service';
import { TestProjectService } from '../../services/tlp-api/test-projects.service';

@Component({
    selector: 'testlink-plugin-instance-login',
    templateUrl: 'instance-login.component.html',
    styleUrls: ['instance-login.component.scss'],
})

export class InstanceLoginComponent implements OnInit {
    id: string;
    instances: IInstance[];
    instanceToLogin: IInstance;
    loading: boolean = true;
    projects: IProject[];

    loginFormControls: ITdDynamicElementConfig[] = [
        {
            name: 'apiKeyElement',
            label: 'TestLink User Api KEy',
            type: TdDynamicElement.Input,
            required: true,
            validators: [{
                validator: (control: AbstractControl) => {
                    let isValid: boolean = (/^[\w]+$/.test(control.value));
                    return !isValid ? { correctExt: true } : undefined;
                },
            }, {
                validator: (control: AbstractControl) => {
                    let isValid: boolean = control.value === '65330eb0c5e8424b696dee2bb5d60fc1';
                    return !isValid ? { invalidKey: true } : undefined;
                },
            }, {
                validator: (control: AbstractControl) => {
                    let isValid: boolean = control.value && (control.value.length > 0);
                    return !isValid ? { length: true } : undefined;
                },
            }],
        },
    ];

    constructor(private _changeDetectorRef: ChangeDetectorRef, public media: TdMediaService,
        private instanceService: InstancesService, private router: Router,
        private activatedRouter: ActivatedRoute, private loadingService: TdLoadingService,
        private localStorageManagerService: LocalStorageManagerService, private testProjectService: TestProjectService) {
    }

    ngOnInit(): void {
        this.activatedRouter.params.subscribe((params: { id: string }) => {
            this.id = params.id;
        });
        this.loadingService.create({
            name: 'loadingLogin',
            mode: LoadingMode.Indeterminate,
            type: LoadingType.Linear,
            color: 'accent',
        });
        this.loadInstance();
    }

    async loadInstance(): Promise<void> {
        try {
            this.loadingService.register('loadingLoginSection');
            this.loading = true;
            await this.instanceService.getInstances()
                .then((instances: IInstance[]) => {
                    this.instances = instances.filter((instance: IInstance) => instance.id === this.id);
                    this.instanceToLogin = this.instances[0];
                });
        } catch (error) {
            console.log(error);
        } finally {
            this.loading = false;
            this.loadingService.resolve('loadingLoginSection');
        }
    }

    login(value: any): void {
        let connectionHeader: IConnectionHeader = {
            instance: this.instanceToLogin.description,
            key: value.apiKeyElement,
        };
        console.log(`Value to log in: ${JSON.stringify(connectionHeader)}`);
        this.setConnectionHeaderToLocalStorage(connectionHeader);
        this.getConnectionHeaderToLocalStorage();
        this.getTLPprojects();
        this.router.navigate(['/testlink-plugin/dashboard']);
    }

    async setConnectionHeaderToLocalStorage(connectionHeader: IConnectionHeader): Promise<void> {
        await this.localStorageManagerService.setConnectionHeader(connectionHeader)
            .then(() => {
                console.info(`connection header established to local storage with the following value: ${JSON.stringify(connectionHeader)}`);
            })
            .catch((error: any) => {
                console.log(`Error when trying to establish connection: ${error}`);
            });
    }

    async getConnectionHeaderToLocalStorage(): Promise<void> {
        await this.localStorageManagerService.getConnectionHeader()
            .then((connectionHeader: IConnectionHeader) => {
                console.log(`connection header returned from local storage with the following value: ${JSON.stringify(connectionHeader)}`);
            })
            .catch((error: any) => {
                console.log(`Error when trying to get connection header: ${error}`);
            });
    }

    async getTLPprojects(): Promise<void> {
        await this.testProjectService.getInstances()
            .then((response: IProject[]) => {
                this.projects = response;
                console.log(`Instances returned: ${JSON.stringify(response, undefined, 4)}`);

            })
            .catch((error: any) => {
                console.log(`Error when trying to get connection header: ${error}`);
            });
    }
}
