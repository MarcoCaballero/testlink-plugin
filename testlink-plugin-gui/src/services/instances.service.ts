import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class InstancesService {

    // Observable string sources
    private onInstanceAdded: Subject<string> = new Subject();
    private onInstanceRemvoed: Subject<string> = new Subject();

    // Observable string streams
    onInstanceAdded$: Observable<string> = this.onInstanceAdded.asObservable();
    onInstanceRemoved$: Observable<string> = this.onInstanceRemvoed.asObservable();

    // Service message commands
    instanceAdd(msg: string): void {
        this.onInstanceAdded.next(msg);
    }

    instanceRemove(msg: string): void {
        this.onInstanceRemvoed.next(msg);
    }
}
