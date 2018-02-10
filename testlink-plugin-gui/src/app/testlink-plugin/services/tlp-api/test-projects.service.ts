import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

import { IConnectionHeader } from '../../model/connection-header';
import { LocalStorageManagerService } from '../../services/local-storage-manager.service';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class TestProjectService {

    constructor(private http: HttpClient, private localStorageManagerService: LocalStorageManagerService) {
    }

    get<T>(url: string, headers?: HttpHeaders | null): Observable<T> {
        const expandedHeaders: object = this.prepareHeader(headers);
        return this.http.get<T>(url, expandedHeaders);
    }

    getInstances(): Promise<any> {
        return this.get<any>('http://localhost:8080/tlp-api/testproject')
            .toPromise()
            .then((response: any) => {
                console.log(`responsed: ${JSON.stringify(response)}`);
                return response;
            })
            .catch((error: any) => console.error(error));
    }

    private prepareHeader(headers: HttpHeaders | null): object {
        headers = headers || new HttpHeaders();

        headers = headers.set('TLP-Server-Url', 'http://localhost:80/testlink/lib/api/xmlrpc/v1/xmlrpc.php');
        headers = headers.set('TLP-Api-Key', '65330eb0c5e8424b696dee2bb5d60fc1');
        headers = headers.set('Accept', 'application/json');

        return {
            headers: headers,
        };
    }
}
