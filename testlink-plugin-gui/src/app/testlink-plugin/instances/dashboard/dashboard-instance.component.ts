import { Component, OnInit, ViewChild, OnDestroy, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { TdLoadingService, TdDialogService, TdMediaService, LoadingMode, LoadingType } from '@covalent/core';
import { Subscription } from 'rxjs/Subscription';

import { InstancesService } from 'services/instances.service';
import { IInstance } from 'model/instance';

import 'rxjs/add/operator/toPromise';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'testlink-plugin-dashboard-instance',
    templateUrl: 'dashboard-instance.component.html',
})

export class DashboardInstanceComponent implements OnInit, OnDestroy, AfterViewInit {

    pepes: number = 0;
    subscription: Subscription;
    instances: IInstance[] = [];
    filteredInstances: IInstance[] = [];
    menuItems: Object[] = [
        {
            icon: 'home',
            route: '.',
            title: 'Home',
        }, {
            icon: 'library_books',
            route: '.',
            title: 'Documentation',
        }, {
            icon: 'color_lens',
            route: '.',
            title: 'Style Guide',
        }, {
            icon: 'view_quilt',
            route: '.',
            title: 'Layouts',
        }, {
            icon: 'picture_in_picture',
            route: '.',
            title: 'Components & Addons',
        },
    ];

    constructor(private instanceService: InstancesService, public media: TdMediaService,
        private loadingService: TdLoadingService, private router: Router,
        private activatedRouter: ActivatedRoute, private _changeDetectorRef: ChangeDetectorRef) {
    }

    ngOnInit(): void {
        this.loadInstances();
    }

    filterBlogs(title: string = ''): void {
        this.filteredInstances = this.instances.filter((itemInstance: IInstance) => {
            return itemInstance.title.toLowerCase().indexOf(title.toLowerCase()) > -1;
        });
    }

    callMe(event: any): void {
        console.log(`filtering ... : ${event} ENDF`);
    }

    async loadInstances(): Promise<void> {
        try {
            this.loadingService.register('loadingDashboardInstance');
            this.instanceService.getInstances()
                .then((obj: IInstance[]) => {
                    this.instances = obj;
                    this.filteredInstances = Object.assign([], this.instances);
                });
        } catch (error) {
            console.log(error);
        } finally {
            this.loadingService.resolve('loadingDashboardInstance');
        }

    }

    ngOnDestroy(): void {
        // console.log(`ngOnDestroy: instance: ${JSON.stringify(this.instances)} and filtered: ${JSON.stringify(this.filteredInstances)}`);
    }

    ngAfterViewInit(): void {
        /* VERY IMPORTANT, DO NOT REMOVE THAT CODE (MatSidenav issues redrawing on re-calling) */
        setTimeout(() => {
            this.media.broadcast();
            this._changeDetectorRef.detectChanges();
        });
    }
}
