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
            <ResizablePanel defaultSize={40} minSize={30}
                className='hidden md:block min-w-30 max-w-[400px] bg-accent/80'>
                <Sidebar taskCounts={taskCounts} />
            </ResizablePanel>
            <ResizableHandle className='h-screen w-0' />
            <ResizablePanel defaultSize={60}
                className={cn(
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
                            <Sidebar taskCounts={taskCounts} />
                        </SidebarSheet>
                    </div>
                    {children}
                </div>
                {pathname !== "/search" && <AddTask /> }
            </ResizablePanel>
        </ResizablePanelGroup>
    );
}