"use client";

import { NextUIProvider } from '@nextui-org/system'
import { ThemeProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";

export function Providers({ children }: ThemeProviderProps) {

    return (
        <NextUIProvider>
            <ThemeProvider attribute="class" defaultTheme="system"
                enableSystem={true} disableTransitionOnChange={false}
            >
                {children}
            </ThemeProvider>
        </NextUIProvider>
    );
}
