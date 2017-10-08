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

    instances: IInstance[];
    filteredInstances: IInstance[];

    constructor(private instanceService: InstancesService, public media: TdMediaService, private loadingService: TdLoadingService) { }

    ngOnInit(): void {
        this.loadInstances();
    }

    filterBlogs(title: string = ''): void {
        this.filteredInstances = this.instances.filter((itemInstance: IInstance) => {
            return itemInstance.title.toLowerCase().indexOf(title.toLowerCase()) > -1;
        });
    }

    async loadInstances(): Promise<void> {
        this.instanceService.getInstances()
            .then((instances: IInstance[]) => {
                this.instances = Object.assign([], instances);
                this.filteredInstances = Object.assign([], this.instances);
            });
    }
}
