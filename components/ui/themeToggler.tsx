"use client";

import { ActionIcon, useMantineColorScheme } from "@mantine/core";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import React from "react";

function ThemeToggler({ ...props }) {
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();
    return (
        <ActionIcon size={"md"} onClick={() => toggleColorScheme()} {...props}>
            {colorScheme === "light" ? <MoonIcon /> : <SunIcon />}
        </ActionIcon>
    );
}

export default ThemeToggler;
