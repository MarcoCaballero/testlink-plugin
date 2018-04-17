import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { IInstance } from 'model/instance';

@Injectable()
export class InstancesServiceMock {

    staticData: any = [
        {
            'id': '0',
            'icon': 'looks_one',
            'route': '.',
            'title': 'Instance 1 - Host Instance',
            'description': 'http://testlink.miliziandevelopers.eu/testlink-instance/lib/api/xmlrpc/v1/xmlrpc.php',
            'created': '7/03/2017 11:05 AM',
            'lastAccess': '7/03/2017 11:05 AM',
        },
        {
            'id': '1',
            'icon': 'looks_two',
            'route': '.',
            'title': 'Instance 2 - Apache Server Instance',
            'description': 'http://localhost:80/testlink/lib/api/xmlrpc/v1/xmlrpc.php',
            'created': '7/03/2017 11:05 AM',
            'lastAccess': '7/03/2017 11:05 AM',
        },
        {
            'id': '2',
            'icon': 'looks_three',
            'route': '.',
            'title': 'Instance 3 - Docker',
            'description': 'http://172.18.0.1:80/lib/api/xmlrpc/v1/xmlrpc.php',
            'created': '7/03/2017 11:05 AM',
            'lastAccess': '7/03/2017 11:05 AM',
        },
    ];

    constructor() { }

    getInstances(): Promise<IInstance[]> {
        return new Promise<IInstance[]>((resolve: any, reject: any) => {
            resolve(this.staticData);
        });
    }

    getAll(): Observable<IInstance[]> {
        return new Observable(this.staticData);
    }
}
