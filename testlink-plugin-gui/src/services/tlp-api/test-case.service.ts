import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { testPlanUrl } from 'assets/data/paths';
import { sendResult } from 'assets/data/paths';
import { testcaseUrl } from 'assets/data/paths';
import { ITestCase } from 'model/test-case';
import { IExecution } from 'model/execution';
import { IExecutionResponse } from 'model/execution-response';
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
                return response;
            })
            .catch((error: any) => console.error(error));
    }

    getTestCaseByPlatform(planId: number, buildId: number, testId: number, platform: string): Promise<ITestCase> {
        return this.tlpApiService.get<ITestCase[]>(`${testPlanUrl}/${planId}/build/${buildId}/testcase/${testId}?platform=${platform}`)
            .toPromise()
            .then((response: any) => {
                return response;
            })
            .catch((error: any) => console.error(error));
    }

    postExecutionResult(execution: IExecution): Promise<IExecutionResponse> {
        return this.tlpApiService.post<IExecutionResponse>(`${sendResult}`, execution)
            .toPromise()
            .then((response: any) => {
                return response;
            })
            .catch((error: any) => console.error(error));
    }

    uploadAttachment(formdata: FormData, executionId: number): Promise<IExecutionResponse> {
        return this.tlpApiService.post<IExecutionResponse>(`${testcaseUrl}/${executionId}/upload`, formdata)
            .toPromise()
            .then((response: any) => {
                return response;
            })
            .catch((error: any) => console.error(error));
    }
}
