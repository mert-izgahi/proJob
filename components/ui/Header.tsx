"use client";

import { Burger, Group, Text } from "@mantine/core";
import React from "react";
import ThemeToggler from "./themeToggler";
import Link from "next/link";

function Header({ opened, toggle }: { opened: boolean; toggle: () => void }) {
    return (
        <Group h="100%" px="md" w="100%" justify="space-between">
            <Burger
                opened={opened}
                onClick={toggle}
                hiddenFrom="sm"
                size="sm"
            />

            <Text component={Link} href="/overview" size="xl" fw="bolder">
                ProJob
            </Text>
            <ThemeToggler />
        </Group>
    );
}

export default Header;
