"use server";

import prisma from "./db";
import { auth, redirectToSignIn } from "@clerk/nextjs";
import { JobSearchParams, JobType } from "./types";

import { jobValidationSchema } from "./validations";
import { Prisma } from "@prisma/client";

function authenticateAndRedirect(): string {
    const { userId } = auth();
    if (!userId) {
        return redirectToSignIn();
    }
    return userId;
}

export async function createJob(job: JobType): Promise<JobType | null> {
    const userId = authenticateAndRedirect();
    try {
        await jobValidationSchema.parse(job);
        const newJob = await prisma.job.create({
            data: {
                ...job,
                clerkId: userId as string,
            },
        });
        return newJob;
    } catch (error) {
        console.log(error);

        return null;
    }
}

export async function getAllJobs(params: JobSearchParams): Promise<{
    jobs: JobType[];
    total: number;
    totalPages: number;
    page: number;
} | null> {
    const userId = authenticateAndRedirect();

    try {
        let queryObj: Prisma.JobWhereInput = {
            clerkId: userId as string,
        };
        let page: number = params.page || 1;
        let limit: number = params.limit || 10;
        console.log(params);

        if (params.status && params.status !== "all") {
            queryObj = {
                ...queryObj,
                status: params.status,
            };
        }

        if (params.type && params.type !== "all") {
            queryObj = {
                ...queryObj,
                type: params.type,
            };
        }

        if (params.level && params.level !== "all") {
            queryObj = {
                ...queryObj,
                level: params.level,
            };
        }

        if (params.applyMethod && params.applyMethod !== "all") {
            queryObj = {
                ...queryObj,
                applyMethod: params.applyMethod,
            };
        }

        if (params.minSalary) {
            queryObj = {
                ...queryObj,
                salary: {
                    gte: params.minSalary,
                },
            };
        }

        if (params.maxSalary) {
            queryObj = {
                ...queryObj,
                salary: {
                    lte: params.maxSalary,
                },
            };
        }

        if (params.search) {
            queryObj = {
                ...queryObj,
                OR: [
                    {
                        title: {
                            contains: params.search,
                            mode: "insensitive",
                        },
                    },
                    {
                        company: {
                            contains: params.search,
                            mode: "insensitive",
                        },
                    },
                ],
            };
        }
        const jobs = await prisma.job.findMany({
            where: queryObj,
            take: params.limit,
            skip: (page - 1) * limit,
            orderBy: {
                createdAt: params.sort,
            },
        });

        const total = await prisma.job.count({
            where: queryObj,
        });

        const totalPages = Math.ceil(total / limit);
        return {
            jobs,
            total,
            totalPages,
            page,
        };
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function getJobById(id: string): Promise<JobType | null> {
    const userId = authenticateAndRedirect();
    try {
        const job = await prisma.job.findFirst({
            where: {
                id,
                clerkId: userId as string,
            },
        });
        return job;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function deleteJob(id: string): Promise<JobType | null> {
    const userId = authenticateAndRedirect();
    try {
        const job = await prisma.job.delete({
            where: {
                id,
            },
        });
        return job;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function updateJob(
    id: string,
    job: JobType
): Promise<JobType | null> {
    const userId = authenticateAndRedirect();
    try {
        await jobValidationSchema.parse(job);
        const updatedJob = await prisma.job.update({
            where: {
                id,
            },
            data: {
                ...job,
            },
        });
        return updatedJob;
    } catch (error) {
        console.log(error);
        return null;
    }
}
