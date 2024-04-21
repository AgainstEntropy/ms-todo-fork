"use client";

import { ReactNode } from 'react';
import Sidebar from './sidebar';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import { TaskCountsType } from '@/types/tasks-counts';
import SidebarSheet from './sidebar-sheet';
import AddTask from './add-task';

export default function AppShell({
    children,
    taskCounts,
}: {
    children: ReactNode,
    taskCounts: TaskCountsType,
}) {

    const pathname = usePathname();

    return (
        <div className="h-screen flex">
            <div className='hidden md:block'>
                <Sidebar taskCounts={taskCounts}/>
            </div>
            <div className={cn(
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
                            <Sidebar taskCounts={taskCounts}/>
                        </SidebarSheet>
                    </div>
                    {children}
                </div>
                <AddTask />
            </div>
        </div>
    );
}