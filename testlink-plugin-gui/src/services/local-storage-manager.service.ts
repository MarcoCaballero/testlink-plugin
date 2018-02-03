import { Injectable } from '@angular/core';
import { IConnectionHeader } from 'model/connection-header';

@Injectable()
export class LocalStorageManagerService {

    private key: string = 'connection-header';

    getConnectionHeader(): Promise<IConnectionHeader> {
        if (localStorage.length > 0) {
            return Promise.resolve(JSON.parse(localStorage.getItem(this.key)));
        }
        return Promise.reject('Local Storage did not find the key');
    }

    setConnectionHeader(connectionHeader: IConnectionHeader): Promise<void> {
        if (this.isLocalStorageAvailable()) {
            localStorage.setItem(this.key, JSON.stringify(connectionHeader));
            return Promise.resolve();
        }
        return Promise.reject('Local Storage is not available on the browser');
    }

    isLocalStorageAvailable(): Promise<Boolean> {
        return Promise.resolve(window.localStorage ? true : false);
    }
}
