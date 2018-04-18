import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { BrowserModule, By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ANGULAR_MODULES, COVALENT_MODULES, MATERIAL_MODULES } from 'app/module.test.builder';

import { InstancesService } from 'services/instances.service';
import { InstancesServiceMock } from 'app/mocks/instances.service.mock';
import { IInstance } from 'model/instance';
import { DashboardInstanceComponent } from './dashboard-instance.component';

describe('DashboardInstanceComponent Unit Testing', () => {
    let comp: DashboardInstanceComponent;
    let fixture: ComponentFixture<DashboardInstanceComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                MATERIAL_MODULES, COVALENT_MODULES, ANGULAR_MODULES,
            ],
            declarations: [
                DashboardInstanceComponent,
            ],
            providers: [
                { provide: InstancesService, useClass: InstancesServiceMock },
            ],
        }).compileComponents()
            .then(() => {
                fixture = TestBed.createComponent(DashboardInstanceComponent);
                comp = fixture.debugElement.componentInstance;
                comp.ngOnInit();
            });
    }));

    it(`Should load TestLink instances (3 instances)`, async(async () => {
        fixture.whenStable().then(() => {
            expect(comp.filteredInstances.length).toEqual(3);
        });
    }));

    it(`Should display HTML instances titles.`, async(async () => {
        fixture.whenStable().then(() => {
            fixture.detectChanges();
            const compiled: HTMLElement = fixture.debugElement.nativeElement;
            expect(compiled.querySelector('md-card-content md-list a').textContent).toContain('Instance 1 - Host Instance');
            expect(compiled.querySelector('md-card-content md-list').textContent).toContain('Instance 2 - Apache Server Instance');
            expect(compiled.querySelector('md-card-content md-list').textContent).toContain('Instance 3 - Docker');

        });
    }));
});
