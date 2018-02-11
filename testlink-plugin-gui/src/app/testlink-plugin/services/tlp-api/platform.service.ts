import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { testPlanUrl } from 'assets/data/paths';
import { IPlatform } from '../../model/platform';
import { TlpApiService } from '../../services/tlp-api/tlp-api.service';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class PlatformService {

    constructor(private tlpApiService: TlpApiService) {
    }

    getPlatforms(testPlanId: number): Promise<IPlatform[]> {
        return this.tlpApiService.get<IPlatform[]>(`${testPlanUrl}/${testPlanId}/platforms`)
            .toPromise()
            .then((response: any) => {
                console.log(`responsed: ${JSON.stringify(response)}`);
                return response;
            })
            .catch((error: any) => console.error(error));
    }
}
