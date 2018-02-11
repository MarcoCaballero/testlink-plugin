import {environment} from 'environments/environment';

export const baseUrl: string = environment.tlpApiUrl;

export const testProjectsUrl: string = `${baseUrl}/testproject`;

export const testPlanUrl: string = `${baseUrl}/testplan`;
