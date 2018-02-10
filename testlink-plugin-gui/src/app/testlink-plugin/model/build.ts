export interface IBuild {
    id: string;
    testSuitName: string;
    testCase: string;
    platform: string;
    priority: string;
    status: string;
    assignedSince: Date;
}
