import { IBuild } from './build';
export interface ITestPlan {
    id: string;
    name: string;
    description: string;
    testCaseCount: number;
    buildCount: number;
    platform?: string;
    isActive: boolean;
    isPublic: boolean;
    builds?: IBuild[];
}
