"use client";

import { ReactNode, useState } from 'react';
import { ChevronLeftIcon } from '@radix-ui/react-icons';
import Header from './header';
import Sidebar from './sidebar';
import { Button } from './ui/button';
import { Separator } from "./ui/separator"
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

export default function AppShell({ children }: { children: ReactNode }) {

    const [open, setOpen] = useState(false);
    const pathname = usePathname();

    return (
        <div className="grid grid-cols-1 sm:grid-cols-3">
            <div className='sm:col-span-3'>
                <Header />
            </div>
            <Separator className='my-1 sm:col-span-3' />
            <div className={cn(
                "absolute top-[89px] p-5",
                "transition delay-200 bg-background w-full h-4/5",
                "sm:relative sm:col-span-1 sm:top-0 sm:transform-none",
                open ? "translate-x-0" : "-translate-x-full"
            )}>
                <Sidebar onClick={() => setOpen(false)} />
            </div>
            <div className="sm:hidden mt-2">
                <Button
                    className={cn(
                        pathname === "/tasks" && "text-accent-blue-foreground",
                        pathname === "/important" && "text-accent-pink-foreground",
                        pathname === "/myday" && "text-accent-green-foreground"
                    )}
                    variant="link"
                    onClick={() => setOpen(true)}
                >
                    <ChevronLeftIcon className="w-6 h-6" /> Lists
                </Button>
            </div>
            <div className="p-5 sm:col-span-2">{children}</div>
        </div>
    );
}