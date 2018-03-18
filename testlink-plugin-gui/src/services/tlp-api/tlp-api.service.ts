import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';

import { LocalStorageManagerService } from 'services/local-storage-manager.service';
import { IConnectionHeader } from 'model/connection-header';

@Injectable()
export class TlpApiService {

    constructor(private http: HttpClient,
        private localStorageManagerService: LocalStorageManagerService) {
    }

    get<T>(url: string, headers?: HttpHeaders | null): Observable<T> {
        const expandedHeaders: object = this.prepareHeader(headers);
        return this.http.get<T>(url, expandedHeaders);
    }

    getAuth<T>(url: string, headers?: HttpHeaders | null): Observable<T> {
        const expandedHeaders: object = this.prepareHeader(headers, false);
        return this.http.get<T>(url, expandedHeaders);
    }

    post<T>(url: string, body: any, headers?: HttpHeaders | null): Observable<T> {
        const expandedHeaders: object = this.prepareHeader(headers);
        return this.http.post<T>(url, body, expandedHeaders);
    }

    private prepareHeader(headers: HttpHeaders | null, addKey: boolean = true): object {
        headers = headers || new HttpHeaders();
        let ch: IConnectionHeader =  this.localStorageManagerService.getConnectionHeader();
        headers = headers.set('TLP-Server-Url', ch.instance);
        if (addKey) {
            headers = headers.set('TLP-Api-Key', ch.key);
        }
        headers = headers.set('Accept', 'application/json');
        return { headers: headers };
    }
}
