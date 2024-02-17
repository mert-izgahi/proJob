import JobSearchForm from "@/components/forms/JobSearchForm";
import JobsGrid from "@/components/ui/JobsGrid";
import React from "react";
import { getAllJobs } from "@/utils/actions";
import {
    HydrationBoundary,
    QueryClient,
    dehydrate,
} from "@tanstack/react-query";
import { JobSearchParams } from "@/utils/types";
async function JobsPage() {
    const params: JobSearchParams = {
        page: 1,
        limit: 10,
        status: "all",
        type: "all",
        level: "all",
    };
    const client = new QueryClient();
    await client.prefetchQuery({
        queryKey: ["jobs", params],
        queryFn: async () => {
            return getAllJobs(params);
        },
    });

    return (
        <HydrationBoundary state={dehydrate(client)}>
            <JobSearchForm />
            <JobsGrid mt="xl" />
        </HydrationBoundary>
    );
}

export default JobsPage;
