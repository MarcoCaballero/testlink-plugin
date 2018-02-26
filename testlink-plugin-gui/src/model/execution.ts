export interface IExecution {
    id: number;
    testPlanId: number;
    buildId: number;
    version: number;
    platformName: string;
    notes: string;
    executionStatusChar: string;
}
