"use client";

import React from "react";
import { JobApplyMethodOptions, JobType } from "@/utils/types";
import {
    Badge,
    Button,
    Card,
    CardSection,
    Flex,
    SimpleGrid,
    Stack,
    Text,
    Title,
} from "@mantine/core";
import {
    IoLocation,
    IoLink,
    IoBriefcase,
    IoBusiness,
    IoCalendar,
    IoRemove,
    IoPencil,
    IoChevronBackOutline,
    IoTrash,
} from "react-icons/io5";
import dayjs from "dayjs";
import Link from "next/link";
import DeleteJobButton from "../buttons/DeleteJobButton";
function JobCard({ job }: { job: JobType }) {
    return (
        <Card withBorder>
            <Card.Section p="sm">
                <Flex align="center" justify={"space-between"}>
                    <Title order={3}>{job.title}</Title>
                    {job.salary && Number(job.salary) > 0 && (
                        <Badge color="green" variant="light">
                            ${job.salary}
                        </Badge>
                    )}
                </Flex>
                <Text>{job.company}</Text>
            </Card.Section>

            <Card.Section p="sm">
                <Text>{job.description}</Text>
            </Card.Section>

            <Card.Section p="sm">
                <SimpleGrid cols={1}>
                    <SimpleGrid cols={2}>
                        <Flex align="center" gap={"xs"}>
                            <IoLocation />
                            <Text>{job.location}</Text>
                        </Flex>

                        <Flex align="center" gap={"xs"}>
                            <IoBriefcase />
                            <Text>{job.type}</Text>
                        </Flex>
                    </SimpleGrid>
                    <SimpleGrid cols={2}>
                        <Flex align="center" gap={"xs"}>
                            <IoCalendar />
                            <Text>
                                {dayjs(job.createdAt).format("DD/MM/YYYY")}
                            </Text>
                        </Flex>
                        <Flex align="center" gap={"xs"}>
                            <IoBusiness />
                            <Text>{job.company}</Text>
                        </Flex>
                    </SimpleGrid>
                </SimpleGrid>
            </Card.Section>

            <Card.Section p="sm">
                <Flex align="center" gap={"xs"}>
                    <Badge variant="outline" color="grape">
                        {job.level}
                    </Badge>
                    <Badge variant="outline" color="indigo">
                        {job.status}
                    </Badge>
                    <Badge variant="outline" color="lime">
                        {job.type}
                    </Badge>
                </Flex>
            </Card.Section>

            <CardSection p="sm">
                <Flex align="center" gap={"sm"}>
                    <Button
                        component={Link}
                        href={`/jobs/${job.id}`}
                        variant="outline"
                        leftSection={<IoPencil />}
                        fullWidth
                    >
                        Edit
                    </Button>
                    {job.id && <DeleteJobButton id={job.id} />}
                </Flex>
            </CardSection>
        </Card>
    );
}

export default JobCard;
