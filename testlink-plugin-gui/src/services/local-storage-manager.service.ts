import { Injectable } from '@angular/core';
import { IConnectionHeader } from 'model/connection-header';

@Injectable()
export class LocalStorageManagerService {

    private key: string = 'connection-header';

    getConnectionHeader(): IConnectionHeader {
        if (localStorage.length > 0) {
            return JSON.parse(localStorage.getItem(this.key));
        }
        return undefined;
    }

    setConnectionHeader(connectionHeader: IConnectionHeader): Boolean {
        if (this.isLocalStorageAvailable()) {
            localStorage.setItem(this.key, JSON.stringify(connectionHeader));
            return true;
        }
        return false;
    }

    isLocalStorageAvailable(): Boolean {
        return (window.localStorage ? true : false);
    }

    hasConnectionItem(): Boolean {
        if (this.isLocalStorageAvailable) {
            return ((localStorage.getItem(this.key) !== undefined) ? true : false);
        }
        return false;
    }
}
