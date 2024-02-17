import { Flex, NavLink, Stack, Text } from "@mantine/core";
import {
    ArchiveIcon,
    BookmarkIcon,
    FileIcon,
    HomeIcon,
    PlusIcon,
} from "@radix-ui/react-icons";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton, currentUser, useUser } from "@clerk/nextjs";
type NavLinkType = {
    title: string;
    href: string;
    icon: React.ReactNode;
    links?: NavLinkType[];
};
const links: NavLinkType[] = [
    {
        title: "Overview",
        href: "/overview",
        icon: <HomeIcon />,
    },
    {
        title: "Jobs",
        href: "/jobs",
        icon: <ArchiveIcon />,
        links: [
            {
                title: "New Job",
                href: "/jobs/create",
                icon: <PlusIcon />,
            },
            {
                title: "All Jobs",
                href: "/jobs",
                icon: <FileIcon />,
            },
            {
                title: "Saved Jobs",
                href: "/jobs/bookmarks",
                icon: <BookmarkIcon />,
            },
        ],
    },
];
function Sidebar() {
    const pathname = usePathname();
    const { isSignedIn, user, isLoaded } = useUser();
    return (
        <Stack h="100%" justify="space-between">
            <Stack>
                {links.map((link) => {
                    const active = link.href === pathname;
                    const children = link.links?.map((link) => {
                        const active = link.href === pathname;
                        return (
                            <NavLink
                                key={link.title}
                                active={active}
                                component={Link}
                                href={link.href}
                                label={link.title}
                                leftSection={link.icon}
                                variant="filled"
                                style={{
                                    borderRadius: "var(--mantine-radius-sm)",
                                }}
                            />
                        );
                    });

                    return (
                        <NavLink
                            key={link.title}
                            leftSection={link.icon}
                            active={active}
                            component={Link}
                            href={link.href}
                            label={link.title}
                            variant="filled"
                            style={{
                                borderRadius: "var(--mantine-radius-sm)",
                            }}
                        >
                            {children}
                        </NavLink>
                    );
                })}
            </Stack>

            {isSignedIn && (
                <Flex align="center" gap={"md"}>
                    <UserButton afterSignOutUrl="/" />
                    <Stack gap={0}>
                        <Text>
                            {user?.firstName} {user?.lastName}
                        </Text>
                        <Text>{user.emailAddresses[0].emailAddress}</Text>
                    </Stack>
                </Flex>
            )}
        </Stack>
    );
}

export default Sidebar;
