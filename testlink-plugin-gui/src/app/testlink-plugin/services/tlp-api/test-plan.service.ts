import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { testProjectsUrl } from 'assets/data/paths';
import { ITestPlan } from '../../model/test-plan';
import { TlpApiService } from '../../services/tlp-api/tlp-api.service';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class TestPlanService {

    constructor(private tlpApiService: TlpApiService) {
    }

    getPlans(projectId: number): Promise<ITestPlan[]> {
        return this.tlpApiService.get<ITestPlan[]>(`${testProjectsUrl}/${projectId}/testplans`)
            .toPromise()
            .then((response: any) => {
                console.log(`responsed: ${JSON.stringify(response)}`);
                return response;
            })
            .catch((error: any) => console.error(error));
    }
}
