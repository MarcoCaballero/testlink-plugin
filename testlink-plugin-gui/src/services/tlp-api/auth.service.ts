import { Injectable } from '@angular/core';
import { HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { authUrl } from 'assets/data/paths';
import { TlpApiService } from 'services/tlp-api/tlp-api.service';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class AuthService {

    constructor(private tlpApiService: TlpApiService) {
    }

    isAuth(devKey: string): Promise<any> {
        let headers = new HttpHeaders();
        headers = headers.set('TLP-Api-Key', devKey);
        return this.tlpApiService.getAuth<boolean>(`${authUrl}`, headers)
            .toPromise()
            .then((response: any) => {
                console.log(`responsed: ${JSON.stringify(response)}`);
                return response.status;
            })
            .catch((error: any) => {
                console.log(error);
                return error.status;
            });
    }
}
