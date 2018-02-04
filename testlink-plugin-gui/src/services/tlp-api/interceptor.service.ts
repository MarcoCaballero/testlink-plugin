import { Injectable } from '@angular/core';
import { IHttpInterceptor } from '@covalent/http';
import { RequestOptionsArgs } from '@angular/http';
import { IConnectionHeader } from 'model/connection-header';
import { LocalStorageManagerService } from 'services/local-storage-manager.service';

@Injectable()
export class TLPApiInterceptor implements IHttpInterceptor {

    apiKey: string = undefined;
    serverUrl: string = undefined;

    constructor(private localStorageManagerService: LocalStorageManagerService) { }

    onRequest(requestOptions: RequestOptionsArgs): RequestOptionsArgs {
        if (this.isRequestRejected()) {
            throw new Error('error message for subscription error callback');
        }
        this.getConnectionHeaderFromLocalStorage();
        requestOptions.headers.append('TLP-Server-Url', this.serverUrl);
        requestOptions.headers.append('TLP-Api-Key', this.apiKey);
        console.log(`Intercepting request: ${JSON.stringify(requestOptions)}`);
        return requestOptions;
    }

    onRequestError(requestOptions: RequestOptionsArgs): RequestOptionsArgs {
        if (this.isRequestRejected()) {
            throw new Error('error message for subscription error callback'); // or return undefined;
        }
        return requestOptions;
    }

    async getConnectionHeaderFromLocalStorage(): Promise<void> {
        await this.localStorageManagerService.getConnectionHeader()
            .then((connectionHeader: IConnectionHeader) => {
                this.serverUrl = connectionHeader.instance;
                this.apiKey = connectionHeader.key;
            })
            .catch((error: any) => {
                console.log(`Error when trying to get connection header from interceptor: ${error}`);
            });
    }

    private isRequestRejected(): boolean {
        return (!this.localStorageManagerService.hasConnectionItem() || this.apiKey === undefined || this.serverUrl === undefined);
    }
}
