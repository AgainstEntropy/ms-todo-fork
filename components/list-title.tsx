"use client";

import { useState, KeyboardEvent } from "react";
import { TaskListType } from "@/lib/schema";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { updateList } from "@/actions/list";
import { Input } from "./ui/input";
import { Button } from "./ui/button";


export default function ListTitle({ list }: { list: TaskListType }) {

    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(list.title);

    async function handleKeyDown(e: KeyboardEvent) {
        if (e.key === 'Enter') {

            const data = {
                title,
            }

            await updateList(list.id, data);
            setTitle(title);
            setIsEditing(false);
        }
    }

    const handleBlur = () => {
        setIsEditing(false);
        setTitle(list.title);
    }

    return (
        <>
            {isEditing ? (
                <Input type="text" name='title' value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onBlur={() => handleBlur()}
                    autoFocus={true}
                    className="w-auto rounded-sm font-bold text-3xl text-task-foreground"
                />
            ) : (
                <Button variant="ghost" onClick={() => setIsEditing(true)}>
                    <h1 className="flex items-center font-bold text-3xl text-task-foreground">
                        {/* <HamburgerMenuIcon className="w-8 h-8 mr-3" /> */}
                        {list.title}
                    </h1>
                </Button>
            )}
        </>
    )
}