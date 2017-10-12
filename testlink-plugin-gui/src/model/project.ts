export interface IProject {
    id: string;
    name: string;
    description: string;
    prefix: string;
    issueTracker?: string;
    isEnabledRequirements: boolean;
    isActive: boolean;
    isPublic: boolean;
}
