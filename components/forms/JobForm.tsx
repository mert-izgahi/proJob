"use client";

import React, { useEffect } from "react";
import { useForm, zodResolver } from "@mantine/form";
import {
    JobApplyMethodOptions,
    JobLevelOptions,
    JobStatusOptions,
    JobType,
    JobTypeOptions,
} from "@/utils/types";
import { z } from "zod";
import { jobValidationSchema } from "@/utils/validations";
import {
    Button,
    Grid,
    GridCol,
    NumberInput,
    Select,
    TextInput,
    Textarea,
} from "@mantine/core";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createJob, getJobById, updateJob } from "@/utils/actions";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

function JobForm({ jobId, mode, ...props }: { jobId?: string; mode?: string }) {
    const form = useForm<z.infer<typeof jobValidationSchema>>({
        initialValues: {
            title: "Test Job",
            description: "Description of the job",
            location: "Location of the job",
            company: "Company name",
            type: JobTypeOptions.FULL_TIME,
            level: JobLevelOptions.ENTRY_LEVEL,
            url: "https://google.com",
            status: JobStatusOptions.OPEN,
            applyMethod: JobApplyMethodOptions.LINK,
            applyUrl: "https://google.com",
            applyEmail: undefined,
            salary: 0,
        },
        validate: zodResolver(jobValidationSchema),
    });
    const router = useRouter();
    const queryClient = useQueryClient();

    const { mutate: createMutate, isPending: createIsPending } = useMutation({
        mutationKey: ["createJob"],
        mutationFn: async (args: JobType) => await createJob(args),
        onSuccess: (data) => {
            if (!data) {
                toast.error("Something went wrong");
                return;
            }

            toast.success("Job created successfully");

            // form.reset();
            queryClient.invalidateQueries({
                queryKey: ["jobs"],
            });
            queryClient.invalidateQueries({
                queryKey: ["stats"],
            });
            queryClient.invalidateQueries({
                queryKey: ["charts"],
            });

            router.push("/jobs");
        },
    });

    const { mutate: updateMutate, isPending: updateIsPending } = useMutation({
        mutationKey: ["updateJob"],
        mutationFn: async (args: { id: string; data: JobType }) =>
            await updateJob(args.id, args.data),
        onSuccess: (data) => {
            if (!data) {
                toast.error("Something went wrong");
                return;
            }

            toast.success("Job updated successfully");

            // form.reset();
            queryClient.invalidateQueries({
                queryKey: ["jobs"],
            });
            queryClient.invalidateQueries({
                queryKey: ["job", jobId],
            });
            queryClient.invalidateQueries({
                queryKey: ["stats"],
            });
            queryClient.invalidateQueries({
                queryKey: ["charts"],
            });
            router.push("/jobs");
        },
    });

    const { data, isLoading } = useQuery({
        queryKey: ["job", jobId],
        queryFn: async () => {
            if (!jobId) return null;
            return await getJobById(jobId);
        },
        enabled: !!jobId,
    });

    const onSubmit = (values: z.infer<typeof jobValidationSchema>) => {
        if (mode === "edit") {
            if (!jobId) return;
            const args = { id: jobId, data: values };
            updateMutate(args);
        } else {
            createMutate(values);
        }
    };

    useEffect(() => {
        if (data && mode === "edit") {
            form.setValues(data);
        }
    }, [data]);

    return (
        <form onSubmit={form.onSubmit(onSubmit)} noValidate>
            <Grid columns={2}>
                <GridCol span={{ base: 2, md: 1 }}>
                    <TextInput
                        label="Title"
                        description="Job title"
                        withAsterisk
                        {...form.getInputProps("title")}
                    />
                </GridCol>

                <GridCol span={{ base: 2, md: 1 }}>
                    <TextInput
                        label="Company"
                        description="Company name"
                        withAsterisk
                        {...form.getInputProps("company")}
                    />
                </GridCol>

                <GridCol span={{ base: 2, md: 1 }}>
                    <TextInput
                        label="Location"
                        description="Location"
                        withAsterisk
                        {...form.getInputProps("location")}
                    />
                </GridCol>

                <GridCol span={{ base: 2, md: 1 }}>
                    <TextInput
                        label="URL"
                        description="URL to job"
                        withAsterisk
                        {...form.getInputProps("url")}
                    />
                </GridCol>
                <GridCol span={{ base: 2, md: 1 }}>
                    <Select
                        label="Apply Method"
                        description="How to apply"
                        withAsterisk
                        data={[
                            {
                                value: JobApplyMethodOptions.LINK,
                                label: "Link",
                            },
                            {
                                value: JobApplyMethodOptions.EMAIL,
                                label: "Email",
                            },
                        ]}
                        allowDeselect={false}
                        {...form.getInputProps("applyMethod")}
                    />
                </GridCol>
                {form.getInputProps("applyMethod").value ===
                    JobApplyMethodOptions.EMAIL && (
                    <GridCol span={{ base: 2, md: 1 }}>
                        <TextInput
                            label="Email"
                            description="Email to apply"
                            withAsterisk
                            {...form.getInputProps("applyEmail")}
                        />
                    </GridCol>
                )}

                {form.getInputProps("applyMethod").value ===
                    JobApplyMethodOptions.LINK && (
                    <GridCol span={{ base: 2, md: 1 }}>
                        <TextInput
                            label="Apply URL"
                            description="URL to apply"
                            withAsterisk
                            {...form.getInputProps("applyUrl")}
                        />
                    </GridCol>
                )}

                <GridCol span={{ base: 2, md: 2 }}>
                    <Textarea
                        label="Description"
                        description="Job description"
                        rows={5}
                        withAsterisk
                        {...form.getInputProps("description")}
                    />
                </GridCol>

                <GridCol span={{ base: 2, md: 1 }}>
                    <Select
                        data={[
                            {
                                value: JobTypeOptions.FULL_TIME,
                                label: "Full Time",
                            },
                            {
                                value: JobTypeOptions.PART_TIME,
                                label: "Part Time",
                            },
                            {
                                value: JobTypeOptions.CONTRACT,
                                label: "Contract",
                            },
                            {
                                value: JobTypeOptions.INTERNSHIP,
                                label: "Internship",
                            },
                        ]}
                        allowDeselect={false}
                        label="Type"
                        description="Job type"
                        withAsterisk
                        {...form.getInputProps("type")}
                    />
                </GridCol>

                <GridCol span={{ base: 2, md: 1 }}>
                    <Select
                        data={[
                            {
                                value: JobLevelOptions.ENTRY_LEVEL,
                                label: "Entry Level",
                            },
                            {
                                value: JobLevelOptions.INTERMEDIATE,
                                label: "Intermediate",
                            },
                            {
                                value: JobLevelOptions.EXPERT,
                                label: "Expert",
                            },
                        ]}
                        allowDeselect={false}
                        label="Level"
                        description="Job level"
                        withAsterisk
                        {...form.getInputProps("level")}
                    />
                </GridCol>

                <GridCol span={{ base: 2, md: 1 }}>
                    <Select
                        data={[
                            {
                                value: JobStatusOptions.OPEN,
                                label: "Open",
                            },
                            {
                                value: JobStatusOptions.CLOSED,
                                label: "Closed",
                            },
                            {
                                value: JobStatusOptions.ARCHIVED,
                                label: "Archived",
                            },
                        ]}
                        allowDeselect={false}
                        label="Status"
                        description="Job status"
                        withAsterisk
                        {...form.getInputProps("status")}
                    />
                </GridCol>

                <GridCol span={{ base: 2, md: 1 }}>
                    <NumberInput
                        label="Salary"
                        description="Salary in USD"
                        min={0}
                        allowNegative={false}
                        decimalScale={2}
                        decimalSeparator="."
                        thousandSeparator=","
                        prefix="$"
                        {...form.getInputProps("salary")}
                    />
                </GridCol>
            </Grid>

            <Button
                type="submit"
                mt="md"
                disabled={createIsPending || updateIsPending}
                variant="filled"
                loading={createIsPending || updateIsPending}
            >
                {mode && mode === "edit" ? "Update Job" : "Create Job"}
            </Button>
        </form>
    );
}

export default JobForm;
