import { Component, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { TdMediaService } from '@covalent/core';
import { ITdDynamicElementConfig, TdDynamicElement, TdDynamicType } from '@covalent/dynamic-forms';
import { AbstractControl } from '@angular/forms';

import { Subscription } from 'rxjs/Subscription';

import { InstancesService } from 'services/instances.service';

@Component({
    selector: 'testlink-plugin-new-instance',
    templateUrl: 'new-instance.component.html',
})

export class NewInstanceComponent {


    subscription: Subscription;

    multipleValidatorTypes: ITdDynamicElementConfig[] = [
        {
            name: 'serverElement',
            label: 'TestLink Server URL',
            type: TdDynamicElement.Input,
            required: true,
            validators: [{
                validator: (control: AbstractControl) => {
                    let isValid: boolean = (/xmlrpc.php$/.test(control.value));
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

    constructor(private _changeDetectorRef: ChangeDetectorRef,
        public media: TdMediaService, private instanceService: InstancesService) {
        this.subscription = instanceService.onInstanceAdded$.subscribe((msg: String): void => {
            console.log('New instance : Instance recived');
        });
    }

    createInstance(): void {
        this.instanceService.instanceAdd('Added');
        console.log('New instance: Instance added announced$');
    }
}
