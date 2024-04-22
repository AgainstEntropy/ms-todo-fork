"use client";

import React, { useState, KeyboardEvent } from 'react'

import { Button } from './ui/button';
import { Input } from './ui/input';
import { PlusIcon } from '@radix-ui/react-icons';
import { createTask, CreateTaskSchema } from '@/actions/create-task';
import { usePathname } from 'next/navigation';
import { cn, getToday } from '@/lib/utils';

export default function AddTask() {
    const [isAdding, setIsAdding] = useState(false)
    const [title, setTitle] = useState('')

    const pathname = usePathname();

    async function handleKeyDown(e: KeyboardEvent) {
        if (e.key === 'Enter') {

            const data: CreateTaskSchema = {
                title,
                isImportant: pathname === '/important',
                addedToMyDayManually: pathname === '/myday',
            }
            if (pathname === '/inplan') {
                data.addedToMyDayAutomatically = true;
                data.dueDate = getToday();
            }

            await createTask(data);
            setTitle('');
            setIsAdding(false);
        }
    }

    const handleBlur = () => {
        setIsAdding(false);
        setTitle('');
    }

    return (
        <div className='h-12'>
            {isAdding ? (
                <Input
                    type="text"
                    name='title'
                    // placeholder="Task title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onBlur={() => handleBlur()}
                    autoFocus={true}
                    className={cn(
                        'h-full rounded-sm',
                        "focus-visible:ring-0 focus-visible:ring-transparent focus:ring-0 focus:ring-offset-transparent",
                    )}
                />
            ) : (
                <Button variant={'outline'}
                    className='h-full w-full justify-start text-left text-black font-normal bg-accent/85 rounded-sm'
                    onClick={() => setIsAdding(true)}>
                    <PlusIcon className='mr-2' /> Add Task
                </Button>
            )}
        </div>
    )
}