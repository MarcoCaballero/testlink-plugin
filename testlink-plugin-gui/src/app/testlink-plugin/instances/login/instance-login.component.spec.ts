import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { BrowserModule, By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ANGULAR_MODULES, COVALENT_MODULES, MATERIAL_MODULES } from 'app/module.test.builder';

import { InstancesService } from 'services/instances.service';
import { LocalStorageManagerService } from 'services/local-storage-manager.service';
import { AuthService } from 'services/tlp-api/auth.service';

import { TdMediaService, TdDialogService, TdLoadingService } from '@covalent/core';

import { InstancesServiceMock } from 'app/mocks/instances.service.mock';
import { LocalStorageManagerServiceMock } from 'app/mocks/local-storage.service.mock';
import { AuthServiceMock } from 'app/mocks/auth.service.mock';

import { IInstance } from 'model/instance';
import { InstanceLoginComponent } from './instance-login.component';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

describe('InstanceLoginComponent Unit Testing', () => {
    let comp: InstanceLoginComponent;
    let fixture: ComponentFixture<InstanceLoginComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                MATERIAL_MODULES, COVALENT_MODULES, ANGULAR_MODULES,
            ],
            declarations: [
                InstanceLoginComponent,
            ],
            providers: [
                { provide: InstancesService, useClass: InstancesServiceMock },
                { provide: LocalStorageManagerService, useClass: LocalStorageManagerServiceMock },
                { provide: AuthService, useClass: AuthServiceMock },
                {
                    provide: ActivatedRoute,
                    useValue: {
                        params: Observable.of({ id: '3' }),
                    },
                },
                TdLoadingService,
                TdDialogService,
                TdMediaService,
            ],
        }).compileComponents();
    }));

    it(`Should extract instance to login from ActivatedRoute Service (mocked)`, async(() => {
        fixture = TestBed.createComponent(InstanceLoginComponent);
        comp = fixture.debugElement.componentInstance;
        comp.ngOnInit();
        expect(comp).toBeTruthy();
    }));
});
