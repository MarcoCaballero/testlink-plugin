import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { testProjectsUrl } from 'assets/data/paths';
import { IProject } from 'model/project';
import { TlpApiService } from 'services/tlp-api/tlp-api.service';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class TestProjectService {

    constructor(private tlpApiService: TlpApiService) {
    }

    getProjects(): Promise<IProject[]> {
        return this.tlpApiService.get<IProject[]>(testProjectsUrl)
            .toPromise()
            .then((response: any) => {
                console.log(`responsed: ${JSON.stringify(response)}`);
                return response;
            })
            .catch((error: any) => console.error(error));
    }
}
