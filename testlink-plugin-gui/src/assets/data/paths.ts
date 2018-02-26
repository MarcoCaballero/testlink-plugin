import {environment} from 'environments/environment';

export const baseUrl: string = environment.tlpApiUrl;

export const testProjectsUrl: string = `${baseUrl}/testproject`;

export const testPlanUrl: string = `${baseUrl}/testplan`;

export const testcaseUrl: string = `${baseUrl}/testcase/execution`;

export const authUrl: string = `${baseUrl}/authorization`;

export const sendResult: string = `${baseUrl}/testcase/reportResult`;
