import { IBuild } from './build';
export interface ITestPlan {
    id: number;
    name: string;
    projectName?: string;
    notes: string;
    customFields: string[];
    platforms?: string[];
    active: boolean;
    public: boolean;
    builds?: IBuild[];
}
