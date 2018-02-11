export interface ITestCaseStep {
    id: number;
    testCaseVersionId: string;
    number: number;
    actions: string;
    expectedResults: string;
    active: boolean;
    executionType: string;
}
