import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Subject } from 'rxjs/Subject';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

import { IInstance } from '../model/instance';

@Injectable()
export class InstancesService {

    constructor(private http: Http) {
    }

    getInstances(): Promise<IInstance[]> {
        return this.http.get('assets/data/instances.json')
            .toPromise()
            .then(
            (response: any) => {
                return response.json();
            })
            .catch((error: any) => console.error(error));
    }

    getAll(): Observable<IInstance[]> {
        return this.http.get('assets/data/instances.json')
            .map((response: any) => response.json() as IInstance[]);
    }
}
