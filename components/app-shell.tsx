"use client";

import { ReactNode } from 'react';
import Sidebar from './sidebar';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import { TaskCountsType } from '@/types/tasks-counts';
import SidebarSheet from './sidebar-sheet';
import AddTask from './add-task';

import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "./ui/resizable"

export default function AppShell({
    children,
    taskCounts,
}: {
    children: ReactNode,
    taskCounts: TaskCountsType,
}) {

    const pathname = usePathname();

    return (
        <ResizablePanelGroup direction="horizontal">
            <ResizablePanel minSize={30}
                className='hidden md:block min-w-30 max-w-[400px] bg-accent/80'>
                <Sidebar taskCounts={taskCounts} />
            </ResizablePanel>
            <ResizableHandle className='h-screen bg-white' />
            <ResizablePanel className={cn(
                "flex flex-col justify-between flex-grow p-10 pt-8 md:rounded-tl-lg",
                "transition",
                pathname === "/tasks" && "bg-task-background dark:bg-background",
                pathname === "/important" && "bg-important-background dark:bg-background text-important-foreground",
                pathname === "/inplan" && "bg-inplan-background dark:bg-background text-inplan-foreground",
                pathname === "/myday" && "text-accent-green-foreground"
            )}>
                <div>
                    <div className="md:hidden">
                        <SidebarSheet>
                            <Sidebar taskCounts={taskCounts} />
                        </SidebarSheet>
                    </div>
                    {children}
                </div>
                <AddTask />
            </ResizablePanel>
        </ResizablePanelGroup>
    );
}

export function ResizableDemo() {
    return (
        <ResizablePanelGroup
            direction="horizontal"
            className="min-h-[200px] max-w-md rounded-lg border"
        >
            <ResizablePanel defaultSize={25}>
                <div className="flex h-full items-center justify-center p-6">
                    <span className="font-semibold">Sidebar</span>
                </div>
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={75}>
                <div className="flex h-full items-center justify-center p-6">
                    <span className="font-semibold">Content</span>
                </div>
            </ResizablePanel>
        </ResizablePanelGroup>
    )
}