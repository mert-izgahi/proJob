"use client";
import {
    JobStatusOptions,
    JobApplyMethodOptions,
    JobLevelOptions,
    JobTypeOptions,
} from "@/utils/types";
import { jobSearchParamsSchema } from "@/utils/validations";
import {
    Button,
    Flex,
    Grid,
    GridCol,
    NumberInput,
    RangeSlider,
    Select,
    SimpleGrid,
    TextInput,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { z } from "zod";

function JobSearchForm({ ...props }) {
    const form = useForm<z.infer<typeof jobSearchParamsSchema>>({
        initialValues: {
            search: "",
            page: 1,
            limit: 10,
            sort: "asc",
            status: "all",
            type: "all",
            level: "all",
            applyMethod: "all",
            minSalary: 0,
            maxSalary: 0,
        },

        validate: zodResolver(jobSearchParamsSchema),
    });
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();

    const onSubmit = (values: z.infer<typeof jobSearchParamsSchema>) => {
        // set search params

        let params = new URLSearchParams();

        if (values.search) {
            params.set("search", values.search);
        }

        if (values.status !== "all") {
            params.set("status", values.status as string);
        }

        if (values.type !== "all") {
            params.set("type", values.type as string);
        }

        if (values.level !== "all") {
            params.set("level", values.level as string);
        }

        if (values.applyMethod !== "all") {
            params.set("applyMethod", values.applyMethod as string);
        }

        if (values.minSalary) {
            params.set("minSalary", values.minSalary.toString());
        }

        if (values.maxSalary) {
            params.set("maxSalary", values.maxSalary.toString());
        }

        // redirect

        router.push(`${pathname}?${params.toString()}`);
    };

    useEffect(() => {
        if (searchParams) {
            if (searchParams.get("search")) {
                form.setFieldValue(
                    "search",
                    searchParams.get("search") as string
                );
            }

            if (searchParams.get("status")) {
                form.setFieldValue(
                    "status",
                    searchParams.get("status") as string
                );
            }

            if (searchParams.get("type")) {
                form.setFieldValue("type", searchParams.get("type") as string);
            }

            if (searchParams.get("level")) {
                form.setFieldValue(
                    "level",
                    searchParams.get("level") as string
                );
            }

            if (searchParams.get("applyMethod")) {
                form.setFieldValue(
                    "applyMethod",
                    searchParams.get("applyMethod") as string
                );
            }

            if (searchParams.get("minSalary")) {
                form.setFieldValue(
                    "minSalary",
                    parseInt(searchParams.get("minSalary") as string)
                );
            }

            if (searchParams.get("maxSalary")) {
                form.setFieldValue(
                    "maxSalary",
                    parseInt(searchParams.get("maxSalary") as string)
                );
            }

            if (searchParams.get("page")) {
                form.setFieldValue(
                    "page",
                    parseInt(searchParams.get("page") as string)
                );
            }

            if (searchParams.get("limit")) {
                form.setFieldValue(
                    "limit",
                    parseInt(searchParams.get("limit") as string)
                );
            }
        }
    }, [searchParams]);
    return (
        <form onSubmit={form.onSubmit(onSubmit)} noValidate {...props}>
            <Grid columns={3}>
                <GridCol span={{ base: 3, md: 1 }}>
                    <TextInput
                        label="Search"
                        {...form.getInputProps("search")}
                    />
                </GridCol>

                <GridCol span={{ base: 3, md: 1 }}>
                    <Select
                        label="Status"
                        data={[
                            { value: "all", label: "All" },
                            {
                                value: JobStatusOptions.ARCHIVED,
                                label: "Archived",
                            },
                            {
                                value: JobStatusOptions.CLOSED,
                                label: "Closed",
                            },
                            {
                                value: JobStatusOptions.OPEN,
                                label: "Open",
                            },
                        ]}
                        allowDeselect={false}
                        {...form.getInputProps("status")}
                    />
                </GridCol>

                <GridCol span={{ base: 3, md: 1 }}>
                    <Select
                        label="Type"
                        data={[
                            { value: "all", label: "All" },
                            {
                                value: JobTypeOptions.FULL_TIME,
                                label: "Full Time",
                            },
                            {
                                value: JobTypeOptions.INTERNSHIP,
                                label: "Internship",
                            },
                        ]}
                        allowDeselect={false}
                        {...form.getInputProps("type")}
                    />
                </GridCol>

                <GridCol span={{ base: 3, md: 1 }}>
                    <Select
                        label="Level"
                        data={[
                            { value: "all", label: "All" },
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
                        {...form.getInputProps("level")}
                    />
                </GridCol>

                <GridCol span={{ base: 3, md: 1 }}>
                    <Select
                        label="Apply Method"
                        data={[
                            { value: "all", label: "All" },
                            {
                                value: JobApplyMethodOptions.EMAIL,
                                label: "Email",
                            },
                            {
                                value: JobApplyMethodOptions.LINK,
                                label: "Link",
                            },
                        ]}
                        allowDeselect={false}
                        {...form.getInputProps("applyMethod")}
                    />
                </GridCol>

                <GridCol span={{ base: 3, md: 1 }}>
                    <SimpleGrid cols={{ base: 1, md: 2 }}>
                        <NumberInput
                            label="Min Salary"
                            allowNegative={false}
                            prefix="$"
                            {...form.getInputProps("minSalary")}
                        />

                        <NumberInput
                            label="Max Salary"
                            allowNegative={false}
                            prefix="$"
                            defaultValue={form.getInputProps("minSalary").value}
                            min={form.getInputProps("minSalary").value}
                            {...form.getInputProps("maxSalary")}
                        />
                    </SimpleGrid>
                </GridCol>
            </Grid>

            <Flex mt="xl" gap={"xl"}>
                <Button type="submit" fullWidth>
                    Apply
                </Button>
                <Button
                    type="button"
                    variant="outline"
                    component={Link}
                    href="/jobs"
                    fullWidth
                >
                    Reset
                </Button>
            </Flex>
        </form>
    );
}

export default JobSearchForm;
