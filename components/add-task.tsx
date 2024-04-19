"use client";

import React, { useState, KeyboardEvent } from 'react'

import { Button } from './ui/button';
import { Input } from './ui/input';
import { PlusIcon } from '@radix-ui/react-icons';
import { createTask } from '@/actions/create-task';

const AddTask = () => {
    const [isAdding, setIsAdding] = useState(false)
    const [title, setTitle] = useState('')

    async function handleKeyDown(e: KeyboardEvent) {
        if (e.key === 'Enter') {
            await createTask(title);
            setTitle('');
            setIsAdding(false);
        }
    }

    return (
        <div className='my-4'>
            {isAdding ? (
                <Input 
                    type="text" 
                    name='title'
                    placeholder="Task title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onBlur={() => setIsAdding(false)}
                />
            ) : (
                <Button className='mt-5'
                    onClick={() => setIsAdding(true)}>
                    <PlusIcon className='mr-2'/> Add Task
                </Button>
            )}
        </div>
    )
}

export default AddTask