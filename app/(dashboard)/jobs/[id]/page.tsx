import JobForm from "@/components/forms/JobForm";
import React from "react";

function JobPage({ params }: { params: { id: string } }) {
    return (
        <div>
            <JobForm jobId={params.id} mode="edit" />
        </div>
    );
}

export default JobPage;
