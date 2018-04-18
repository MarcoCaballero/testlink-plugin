import { Injectable } from '@angular/core';
import { IConnectionHeader } from 'model/connection-header';

@Injectable()
export class LocalStorageManagerServiceMock {

    private key: string = 'connection-header';

    getConnectionHeader(): IConnectionHeader {
        if (localStorage.length > 0) {
            return {
                instance: 'http://172.18.0.1:80/lib/api/xmlrpc/v1/xmlrpc.php',
                key: 'key',
            };
        }
        return undefined;
    }

    setConnectionHeader(connectionHeader: IConnectionHeader): Boolean {
        if (this.isLocalStorageAvailable()) {
            return true;
        }
        return false;
    }

    isLocalStorageAvailable(): Boolean {
        return true;
    }

    hasConnectionItem(): Boolean {
        if (this.isLocalStorageAvailable) {
            return true;
        }
        return false;
    }
}
