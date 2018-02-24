import { Component, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { TdMediaService, TdDialogService, TdLoadingService, LoadingType, LoadingMode } from '@covalent/core';
import { ITdDynamicElementConfig, TdDynamicElement, TdDynamicType } from '@covalent/dynamic-forms';
import { TdHeadshakeAnimation } from '@covalent/core';

import { Subscription } from 'rxjs/Subscription';

import { IInstance } from 'model/instance';
import { IProject } from 'model/project';
import { IConnectionHeader } from 'model/connection-header';
import { InstancesService } from 'services/instances.service';
import { LocalStorageManagerService } from 'services/local-storage-manager.service';
import { TestProjectService } from 'services/tlp-api/test-projects.service';
import { AuthService } from 'services/tlp-api/auth.service';

@Component({
    selector: 'testlink-plugin-instance-login',
    templateUrl: 'instance-login.component.html',
    styleUrls: ['instance-login.component.scss'],
    animations: [TdHeadshakeAnimation({ duration: 1000, delay: 0 })],
})

export class InstanceLoginComponent implements OnInit {
    id: string;
    instances: IInstance[];
    instanceToLogin: IInstance;
    loading: boolean = true;
    projects: IProject[];
    headshakeState: boolean = false;
    isAuthLogin: boolean = false;
    showError: boolean = false;

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
                    let isValid: boolean = control.value && (control.value.length > 0);
                    return !isValid ? { length: true } : undefined;
                },
            }],
        },
    ];

    constructor(private _changeDetectorRef: ChangeDetectorRef, public media: TdMediaService,
        private instanceService: InstancesService, private router: Router,
        private activatedRouter: ActivatedRoute, private loadingService: TdLoadingService,
        private localStorageManagerService: LocalStorageManagerService,
        private testProjectService: TestProjectService, private authservice: AuthService) {
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
        this.loadingService.register('loadingLoginSection');
        this.checkLogin(value.apiKeyElement)
            .then((authinfo) => {
                console.log(`Check login: ${JSON.stringify(authinfo.result)}`);
                this.isAuthLogin = authinfo.result;
                this.loadingService.resolve('loadingLoginSection');
                if (this.isAuthLogin) {
                    this.doLogin(value);
                } else {
                    this.showError = true;
                    this.headshakeState = !this.headshakeState;
                }
            });
    }

    goBack() {
        this.showError = false;
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

    private checkLogin(key: string) {
        let connectionHeader: IConnectionHeader = {
            instance: this.instanceToLogin.description,
            key: key,
        };
        this.loadingService.register('loadingLoginSection');
        this.loading = true;
        this.setConnectionHeaderToLocalStorage(connectionHeader);
        this.loadingService.resolve('loadingLoginSection');
        return this.authservice.isAuth(key);
    }

    private doLogin(value: any) {
        let connectionHeader: IConnectionHeader = {
            instance: this.instanceToLogin.description,
            key: value.apiKeyElement,
        };
        console.log(`Value to log in: ${JSON.stringify(connectionHeader)}`);
        try {
            this.loadingService.register('loadingLoginSection');
            this.loading = true;
            this.setConnectionHeaderToLocalStorage(connectionHeader)
                .then((): void => {
                    this.router.navigate(['/testlink-plugin/dashboard']);
                })
                .catch((error: any) => {
                    console.error(`error while login: ${error}`);
                });
        } catch (error) {
            console.log(error);
        } finally {
            this.loading = false;
            this.loadingService.resolve('loadingLoginSection');
        }
    }
}
