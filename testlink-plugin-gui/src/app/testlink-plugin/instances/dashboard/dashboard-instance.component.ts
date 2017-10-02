import { Component, OnInit, ViewChild } from '@angular/core';
import { TdLoadingService, TdDialogService, TdMediaService, TdExpansionPanelComponent } from '@covalent/core';

import { Subscription } from 'rxjs/Subscription';

import { InstancesService } from 'services/instances.service';
import { IInstance } from 'model/interfaces';

@Component({
    selector: 'testlink-plugin-dashboard-instance',
    templateUrl: 'dashboard-instance.component.html',
})

export class DashboardInstanceComponent implements OnInit {

    @ViewChild('exppan1') expPan1: TdExpansionPanelComponent;
    subscription: Subscription;

    instances: IInstance[] = [];
    filteredInstances: IInstance[] = [];

    constructor(private instanceService: InstancesService, public media: TdMediaService, private loadingService: TdLoadingService) { }

    showitem(): void {
        console.log(`Child - DashboardInstanceComponent : added instanced ----- ${JSON.stringify(this.instances)}`);
    }

    ngOnInit(): void {
        // broadcast to all listener observables when loading the page
        this.instances = this.instanceService.getArray();
    }

    async load(): Promise<void> {
        this.instances = this.instanceService.getArray();
        this.filteredInstances = Object.assign([], this.instances);
    }

    filterBlogs(title: string = ''): void {
        this.filteredInstances = this.instances.filter((itemInstance: IInstance) => {
            (title === '') ? this.expPan1.close() : this.expPan1.open();
            return itemInstance.title.toLowerCase().indexOf(title.toLowerCase()) > -1;
        });
    }
}
