"use client";

import { ReactNode } from 'react';
import Sidebar from './sidebar';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import SidebarSheet from './sidebar-sheet';
import AddTask from './add-task';

import { ListCountsType, TaskCountsType } from '@/types/tasks-counts';

import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "./ui/resizable"

export default function AppShell({
    children,
    taskCounts,
    listCounts,
}: {
    children: ReactNode,
    taskCounts: TaskCountsType,
    listCounts: ListCountsType[],
}) {

    const pathname = usePathname();

    return (
        <ResizablePanelGroup direction="horizontal">
            <ResizablePanel
                className='hidden md:block min-w-[220px] max-w-[400px] bg-accent/80'>
                <Sidebar taskCounts={taskCounts} listCounts={listCounts} />
            </ResizablePanel>
            <ResizableHandle className='h-screen w-0' />
            <ResizablePanel
                className={cn(
                    "min-w-[calc(100%-400px)] max-w-[calc(100%-220px)]",
                    "flex flex-col justify-between flex-grow p-10 pt-8 md:rounded-tl-lg",
                    "transition",
                    (pathname === "/tasks" || pathname === "/search") && "bg-task-background dark:bg-background",
                    pathname === "/important" && "bg-important-background dark:bg-background text-important-foreground",
                    pathname === "/inplan" && "bg-inplan-background dark:bg-background text-inplan-foreground",
                    pathname === "/myday" && "text-accent-green-foreground"
                )}>
                <div>
                    <div className="md:hidden">
                        <SidebarSheet>
                            <Sidebar taskCounts={taskCounts} listCounts={listCounts} />
                        </SidebarSheet>
                    </div>
                    {children}
                </div>
                {pathname !== "/search" && <AddTask />}
            </ResizablePanel>
        </ResizablePanelGroup>
    );
}