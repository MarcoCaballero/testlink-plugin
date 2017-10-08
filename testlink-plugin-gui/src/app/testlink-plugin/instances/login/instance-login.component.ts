import { Component, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { TdMediaService, TdDialogService, TdLoadingService, LoadingType, LoadingMode } from '@covalent/core';
import { ITdDynamicElementConfig, TdDynamicElement, TdDynamicType } from '@covalent/dynamic-forms';

import { Subscription } from 'rxjs/Subscription';

import { InstancesService } from 'services/instances.service';

import { IInstance } from 'model/interfaces';

@Component({
    selector: 'testlink-plugin-instance-login',
    templateUrl: 'instance-login.component.html',
})

export class InstanceLoginComponent implements OnInit {
    id: string;
    instances: IInstance[];
    instanceToLogin: IInstance;
    loading: boolean = true;

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
        private activatedRouter: ActivatedRoute, private loadingService: TdLoadingService) {
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
            this.loadingService.register('loadingLogin');
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
            this.loadingService.resolve('loadingLogin');
        }
    }
}
