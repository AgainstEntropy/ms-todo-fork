"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";
import { ThemeSwitcher } from "./theme-switcher";


export default function AvatarMenu() {
    const { data: session } = useSession();
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <div className="flex items-center p-1">
                    <Avatar className="h-12 w-12 mr-3 hover:-translate-y-0.5 transition">
                        <AvatarImage src={session?.user.image} />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className="text-left text-sm">
                        <p className="font-bold">{session?.user.name}</p>
                        <p className="text-muted-foreground">{session?.user.email}</p>
                    </div>
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <Button
                        variant='link'
                        onClick={() => signOut()}
                    >
                        Sign Out
                    </Button>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex justify-center">
                    <ThemeSwitcher />
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}