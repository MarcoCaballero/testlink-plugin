import { ITestPlan } from './test-plan';
export interface IProject {
    id: string;
    name: string;
    description: string;
    prefix: string;
    issueTracker?: string;
    isEnabledRequirements: boolean;
    isActive: boolean;
    isPublic: boolean;
    testPlans?: ITestPlan[];
}
