import { Component, HostBinding, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { TdMediaService } from '@covalent/core';

import { fadeAnimation } from '../app.animations';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'testlink-plugin-main',
    templateUrl: 'main.component.html',
    styleUrls: ['main.component.scss'],
    animations: [fadeAnimation],
})

export class MainComponent implements AfterViewInit {

    @HostBinding('@routeAnimation') routeAnimation: boolean = true;
    @HostBinding('class.td-route-animation') classAnimation: boolean = true;

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

    constructor(private _changeDetectorRef: ChangeDetectorRef,
        public media: TdMediaService) { }

    ngAfterViewInit(): void {
        // broadcast to all listener observables when loading the page
        setTimeout(() => { // workaround since MdSidenav has issues redrawing at the beggining
            this.media.broadcast();
            this._changeDetectorRef.detectChanges();
        });
    }

}
