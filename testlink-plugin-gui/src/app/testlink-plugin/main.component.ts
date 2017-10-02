import { Component, HostBinding, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { TdMediaService } from '@covalent/core';

import { Subscription } from 'rxjs/Subscription';

import { InstancesService } from 'services/instances.service';
import { fadeAnimation } from 'app/app.animations';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'testlink-plugin-main',
    templateUrl: 'main.component.html',
    styleUrls: ['main.component.scss'],
    animations: [fadeAnimation],
})

export class MainComponent implements AfterViewInit, OnDestroy {

    @HostBinding('@routeAnimation') routeAnimation: boolean = true;
    @HostBinding('class.td-route-animation') classAnimation: boolean = true;

    subscription: Subscription;

    instances: Object[] = [
        // {
        //     icon: 'looks_one',
        //     route: '.',
        //     title: 'Instance 1',
        //     description: 'http://aaa/testlink/lib/xmlrpc.php',
        // }, {
        //     icon: 'looks_two',
        //     route: '.',
        //     title: 'Instance 2',
        //     description: 'http://aaa/testlink/lib/xmlrpc.php',
        // }, {
        //     icon: 'looks_3',
        //     route: '.',
        //     title: 'Instance 3',
        //     description: 'http://aaa/testlink/lib/xmlrpc.php',
        // },
    ];

    constructor(private _changeDetectorRef: ChangeDetectorRef,
        public media: TdMediaService, private instanceService: InstancesService) {

        this.subscription = instanceService.onInstanceAdded$.subscribe((msg: String): void => {
            this.instances.push(
                {
                    icon: 'looks_one',
                    route: '.',
                    title: 'Instance 1',
                    description: 'http://aaa/testlink/lib/xmlrpc.php',
                },
            );
        });

        instanceService.onInstanceRemoved$.subscribe((msg: String): void => {
            let obj: Object = this.instances.pop();
        });
    }

    ngAfterViewInit(): void {
        // broadcast to all listener observables when loading the page
        setTimeout(() => { // workaround since MdSidenav has issues redrawing at the beggining
            this.media.broadcast();
            this._changeDetectorRef.detectChanges();
        });
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}
