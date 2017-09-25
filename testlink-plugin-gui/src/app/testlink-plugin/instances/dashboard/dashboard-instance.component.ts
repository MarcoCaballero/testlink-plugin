import { Component, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { TdMediaService } from '@covalent/core';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'testlink-plugin-dashboard-instance',
    templateUrl: 'dashboard-instance.component.html',
})

export class DashboardInstanceComponent implements AfterViewInit {

    constructor(private _changeDetectorRef: ChangeDetectorRef, public media: TdMediaService) { }

    ngAfterViewInit(): void {
        // broadcast to all listener observables when loading the page
        setTimeout(() => { // workaround since MdSidenav has issues redrawing at the beggining
            this.media.broadcast();
            this._changeDetectorRef.detectChanges();
        });
    }

}
