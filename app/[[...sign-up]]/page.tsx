import ThemeToggler from "@/components/ui/themeToggler";
import {
    Card,
    CardSection,
    Center,
    Flex,
    Grid,
    GridCol,
    Image,
    Stack,
    Title,
} from "@mantine/core";
import React from "react";
import classes from "./page.module.css";
import { SignUp, ClerkLoading } from "@clerk/nextjs";

function HomePage() {
    console.log(ClerkLoading);

    return (
        <Center h="100vh">
            <Stack>
                <Flex justify={"flex-end"} mb="xl">
                    <ThemeToggler />
                </Flex>
                <SignUp
                    afterSignInUrl={"/overview"}
                    afterSignUpUrl={"/overview"}
                />
            </Stack>
        </Center>
    );
}

export default HomePage;
