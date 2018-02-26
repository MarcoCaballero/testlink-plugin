import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

import { IConnectionHeader } from 'model/connection-header';
import { LocalStorageManagerService } from 'services/local-storage-manager.service';

import 'rxjs/add/operator/toPromise';

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
        headers = headers.set('TLP-Server-Url', 'http://localhost:80/testlink/lib/api/xmlrpc/v1/xmlrpc.php');
        if (addKey) {
            headers = headers.set('TLP-Api-Key', '65330eb0c5e8424b696dee2bb5d60fc1');
        }
        headers = headers.set('Accept', 'application/json');
        return { headers: headers };
    }
}
