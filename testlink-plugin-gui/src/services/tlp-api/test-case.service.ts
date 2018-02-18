import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { testPlanUrl } from 'assets/data/paths';
import { ITestCase } from 'model/test-case';
import { TlpApiService } from 'services/tlp-api/tlp-api.service';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class TestCaseService {

    constructor(private tlpApiService: TlpApiService) {
    }

    getTestCases(planId: number, buildId: number): Promise<ITestCase[]> {
        return this.tlpApiService.get<ITestCase[]>(`${testPlanUrl}/${planId}/build/${buildId}/testcases`)
            .toPromise()
            .then((response: any) => {
                console.log(`responsed: ${JSON.stringify(response)}`);
                return response;
            })
            .catch((error: any) => console.error(error));
    }
}
