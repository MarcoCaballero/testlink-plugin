import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { IInstance } from 'model/interfaces';

@Injectable()
export class InstancesService {

    private array: IInstance[] = [];
    // Observable string sources
    private onInstanceAdded: Subject<string> = new Subject();
    private onInstanceRemoved: Subject<string> = new Subject();

    // Observable string streams
    onInstanceAdded$: any = this.onInstanceAdded.asObservable();
    onInstanceRemoved$: any = this.onInstanceRemoved.asObservable();

    // Service message commands
    instanceAdd(msg: string): void {
        this.onInstanceAdded.next(msg);
        this.array.push(
            {
                id: 0,
                icon: 'looks_one',
                route: '.',
                title: 'Instance 1',
                description: 'http://aaa/testlink/lib/xmlrpc.php',
                created: new Date('7/01/2017 11:05 AM'),
                lastAccess: new Date('7/01/2017 11:05 AM'),
            },
        );
    }

    instanceRemove(msg: string): void {
        this.onInstanceRemoved.next(msg);
    }

    getArray(): IInstance[] {
        return this.array;
    }
}
