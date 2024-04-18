"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { signOut, useSession } from "next-auth/react";


export default function AvatarMenu() {
    const { data: session } = useSession();
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Avatar>
                    <AvatarImage src={session?.user.image} />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
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
            </DropdownMenuContent>
        </DropdownMenu>
    )
}