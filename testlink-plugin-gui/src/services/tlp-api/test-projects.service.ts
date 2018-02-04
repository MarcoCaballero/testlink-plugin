import { Injectable } from '@angular/core';
import { Http, RequestOptionsArgs, Headers } from '@angular/http';
import { Subject } from 'rxjs/Subject';

import { IConnectionHeader } from 'model/connection-header';
import { LocalStorageManagerService } from 'services/local-storage-manager.service';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class TestProjectService {

    constructor(private http: Http, private localStorageManagerService: LocalStorageManagerService) {
    }

    getInstances(): Promise<any> {
        const headers: any = {
            'TLP-Server-Url': 'http://localhost:80/testlink/lib/api/xmlrpc/v1/xmlrpc.php',
            'TLP-Api-Key': '65330eb0c5e8424b696dee2bb5d60fc1',
        };
        const options: any = { headers: new Headers(headers) };
        return this.http.get('http://localhost:8080/tlp-api/testproject', options)
            .toPromise()
            .then((response: any) => {
                console.log(JSON.stringify(`responsed: ${response}`));
                return response.json();
            })
            .catch((error: any) => console.error(error));
    }
}
