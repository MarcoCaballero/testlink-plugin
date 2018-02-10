import { ITestPlan } from './test-plan';
export interface IProject {
    id: number;
    name: string;
    prefix: string;
    notes: string;
    issueTracker?: string;
    enableRequirements: boolean;
    enableTestPriority: boolean;
    enableAutomation: boolean;
    enableInventory: boolean;
    public: boolean;
    active: boolean;
    testPlans?: ITestPlan[];
}
