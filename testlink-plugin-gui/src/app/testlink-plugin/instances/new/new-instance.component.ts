import { Component, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { TdMediaService } from '@covalent/core';
import { ITdDynamicElementConfig, TdDynamicElement, TdDynamicType } from '@covalent/dynamic-forms';
import { AbstractControl } from '@angular/forms';

import { InstancesService } from 'services/instances.service';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'testlink-plugin-new-instance',
    templateUrl: 'new-instance.component.html',
})

export class NewInstanceComponent implements AfterViewInit {

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
        public media: TdMediaService, private instanceService: InstancesService) { }

    ngAfterViewInit(): void {
        // broadcast to all listener observables when loading the page
        setTimeout(() => { // workaround since MdSidenav has issues redrawing at the beggining
            this.media.broadcast();
            this._changeDetectorRef.detectChanges();
        });
    }

    createInstance(): void {
        this.instanceService.instanceAdd('Added');
        console.log('Child: Instance added on child');
    }
}
