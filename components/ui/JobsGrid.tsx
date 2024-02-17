"use client";

import { getAllJobs } from "@/utils/actions";
import {
    JobApplyMethodOptions,
    JobLevelOptions,
    JobSearchParams,
    JobStatusOptions,
    JobTypeOptions,
} from "@/utils/types";
import { SimpleGrid } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import React from "react";
import JobCard from "./JobCard";

function JobsGrid({ ...props }) {
    const searchParams = useSearchParams();
    const search = searchParams.get("search") || undefined;
    const status: JobStatusOptions =
        (searchParams.get("status") as JobStatusOptions) || "all";
    const type = (searchParams.get("type") as JobTypeOptions) || "all";
    const level = (searchParams.get("level") as JobLevelOptions) || "all";
    const applyMethod =
        (searchParams.get("applyMethod") as JobApplyMethodOptions) || "all";
    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 10;
    const minSalary = Number(searchParams.get("minSalary"));
    const maxSalary = Number(searchParams.get("maxSalary"));
    const args: JobSearchParams = {
        search,
        page,
        status,
        type,
        level,
        applyMethod,
        limit,
        minSalary,
        maxSalary,
    };
    const { data } = useQuery({
        queryKey: [
            "jobs",
            {
                ...args,
            },
        ],
        queryFn: async () => {
            return getAllJobs(args);
        },
    });
    return (
        <SimpleGrid cols={{ base: 1, md: 2, lg: 3 }} spacing="md" {...props}>
            {data?.jobs.map((job) => (
                <JobCard key={job.id} job={job} />
            ))}
        </SimpleGrid>
    );
}

export default JobsGrid;
