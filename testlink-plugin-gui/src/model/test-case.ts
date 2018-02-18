import { ITestCaseStep } from './step';
import { IPlatform } from './platform';

export interface ITestCase {
    id: number;
    name: string;
    testSuiteId: number;
    testProjectId: number;
    authorLogin: string;
    summary: string;
    steps: ITestCaseStep[];
    preconditions: string;
    testCaseStatus: string;
    testImportance: string;
    executionType: string;
    executionOrder: number;
    order: string;
    internalId: string;
    fullExternalId: string;
    checkDuplicatedName: boolean;
    actionOnDuplicatedName: string;
    versionId: number;
    version: number;
    parentId: number;
    customFields: string[];
    executionStatus: string;
    platform: IPlatform;
    featureId: number;
    icon?: string;
}
