import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { testPlanUrl } from 'assets/data/paths';
import { IBuild } from 'model/build';
import { TlpApiService } from 'services/tlp-api/tlp-api.service';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class BuildService {

    constructor(private tlpApiService: TlpApiService) {
    }

    getBuilds(testPlanId: number): Promise<IBuild[]> {
        return this.tlpApiService.get<IBuild[]>(`${testPlanUrl}/${testPlanId}/builds`)
            .toPromise()
            .then((response: any) => {
                console.log(`responsed: ${JSON.stringify(response)}`);
                return response;
            })
            .catch((error: any) => console.error(error));
    }
}
