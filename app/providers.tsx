"use client";

import theme from "@/theme";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { MantineProvider } from "@mantine/core";
import React, { useState } from "react";
import { Toaster } from "react-hot-toast";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

function Providers({ children }: { children: React.ReactNode }) {
    const [mounted, setMounted] = useState(false);
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 10 * 60 * 1000,
                refetchOnWindowFocus: false,
            },
        },
    });
    if (!mounted) {
        setMounted(true);
    }

    if (!mounted) {
        return null;
    }

    return (
        <ClerkProvider
            appearance={{
                baseTheme: dark,
            }}
        >
            <QueryClientProvider client={queryClient}>
                <Toaster />
                <MantineProvider theme={theme}>{children}</MantineProvider>
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        </ClerkProvider>
    );
}

export default Providers;
