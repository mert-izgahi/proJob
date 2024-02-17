export type JobType = {
    id?: string | undefined;
    createdAt?: Date | undefined;
    updatedAt?: Date | undefined;
    title: string;
    description: string;
    company: string;
    location: string;
    type: string;
    level: string;
    url: string;
    status: string;
    applyMethod: string;
    applyUrl?: string | undefined;
    applyEmail?: string | undefined;
    salary?: number | 0 | undefined;
};

export enum JobStatusOptions {
    OPEN = "open",
    CLOSED = "closed",
    ARCHIVED = "archived",
}

export enum JobTypeOptions {
    FULL_TIME = "full-time",
    PART_TIME = "part-time",
    CONTRACT = "contract",
    INTERNSHIP = "internship",
}

export enum JobLevelOptions {
    ENTRY_LEVEL = "entry-level",
    INTERMEDIATE = "intermediate",
    EXPERT = "expert",
}

export enum JobApplyMethodOptions {
    LINK = "link",
    EMAIL = "email",
}

export type JobSearchParams = {
    search?: string | undefined;
    status?: JobStatusOptions | "all";
    type?: JobTypeOptions | "all";
    level?: JobLevelOptions | "all";
    applyMethod?: JobApplyMethodOptions | "all";
    minSalary?: number | undefined;
    maxSalary?: number | undefined;
    page?: number;
    limit?: number;
    sort?: "asc" | "desc";
};
