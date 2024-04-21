"use client";

import { ReactNode, useState } from 'react';
import { ChevronLeftIcon, HamburgerMenuIcon } from '@radix-ui/react-icons';
import Header from './header';
import Sidebar from './sidebar';
import { Button } from './ui/button';
import { Separator } from "./ui/separator"
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import { TaskCountsType } from '@/types/tasks-counts';

export default function AppShell({
    children,
    taskCounts,
}: {
    children: ReactNode,
    taskCounts: TaskCountsType,
}) {

    const [open, setOpen] = useState(false);
    const pathname = usePathname();

    return (
        <div className="h-full grid grid-cols-1 sm:grid-cols-4">
            <div className='sm:col-span-4'>
                <Header />
            </div>
            <Separator className='my-1 sm:col-span-4' />
            <div className={cn(
                "absolute top-[89px]",
                "transition delay-200 bg-background w-full h-full z-10",
                "sm:relative sm:col-span-1 sm:top-0 sm:transform-none",
                open ? "translate-x-0" : "-translate-x-full"
            )}>
                <Sidebar taskCounts={taskCounts} closeSidebar={() => setOpen(false)} />
            </div>
            <div className={cn(
                "sm:col-span-3 p-10 pt-6 sm:pt-10 sm:rounded-tl-lg",
                "transition",
                pathname === "/tasks" && "bg-task-background dark:bg-background",
                pathname === "/important" && "bg-important-background dark:bg-background text-important-foreground",
                pathname === "/inplan" && "bg-inplan-background dark:bg-background text-inplan-foreground",
                pathname === "/myday" && "text-accent-green-foreground"
            )}>
                <button
                    className={cn(
                        "sm:hidden rounded p-2 mb-2 -translate-x-1.5 hover:bg-gray-800/20",
                        pathname === "/tasks" && "text-white hover:text-white",
                    )}
                    onClick={() => setOpen(true)}
                >
                    <HamburgerMenuIcon className="w-5 h-5" />
                </button>
                <div>{children}</div>
            </div>
        </div>
    );
}