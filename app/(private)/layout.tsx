import { auth } from "@/lib/auth";
import { SessionProvider } from "next-auth/react";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

import AppShell from "@/components/app-shell";
import { fetchListsCounts, fetchTaskCounts } from "../lib/data";

export default async function Layout({ children }: { children: ReactNode }) {
    const session = await auth();

    if (!session) {
        redirect('/');
    }

    const listCounts = await fetchListsCounts(session);

    const counts = await fetchTaskCounts(session);

    return (
        <SessionProvider session={session}>
            <AppShell taskCounts={counts} listCounts={listCounts}>
                {children}
            </AppShell>
        </SessionProvider>
    );
}