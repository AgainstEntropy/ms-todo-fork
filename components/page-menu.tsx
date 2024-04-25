"use client";

import deleteList from "@/actions/list"
import { Button } from "./ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { DotsHorizontalIcon } from "@radix-ui/react-icons"


export function PageMenu({ listId }: { listId: number }) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Button variant="ghost"
                    className="px-3"
                >
                    <DotsHorizontalIcon />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                {/* <DropdownMenuLabel>My Account</DropdownMenuLabel> */}
                <DropdownMenuItem>Rename list</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive"
                    onClick={() => {deleteList(listId)}}
                >
                    Delete list
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}