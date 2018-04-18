import { Injectable } from '@angular/core';
import { HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { authUrl } from 'assets/data/paths';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class AuthServiceMock {

    isAuth(devKey: string): Promise<any> {
        return new Promise<any>((resolve: any, reject: any) => {
            resolve({result: true, url: 'http://172.18.0.1:80/lib/api/xmlrpc/v1/xmlrpc.php'});
        });
    }
}
