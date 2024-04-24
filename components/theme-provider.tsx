"use client";

import { NextUIProvider } from '@nextui-org/system'
import { ThemeProvider as NextThemeProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";

export function ThemeProvider({ children }: ThemeProviderProps) {
    return (
        <NextUIProvider>
            <NextThemeProvider attribute="class" defaultTheme="system"
                enableSystem={true} disableTransitionOnChange={false}
            >
                {children}
            </NextThemeProvider>
        </NextUIProvider>
    );
}
