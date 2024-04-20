import { TaskCountsType } from '@/types/tasks-counts'
import { HomeIcon, SunIcon, StarIcon } from '@radix-ui/react-icons'
import Link from 'next/link'
import React from 'react'
import { Separator } from './ui/separator'

const Sidebar = ({
  taskCounts,
  closeSidebar
}: {
  taskCounts: TaskCountsType
  closeSidebar: Function
}) => {
  return (
    <div>
      {/* TODO: add a search bar here */}
      <div className='flex flex-col gap-2'>
        <div className='px-2 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800'>
          <Link href="/myday" onClick={() => closeSidebar()}
            className='flex gap-2 items-center justify-between'>
            <div className='flex items-center gap-5'>
              <SunIcon className='w-6 h-6 text-accent-green-foreground' />
              My Day
            </div>
            <div className='text-muted-foreground'>
              {taskCounts.myDay}
            </div>
          </Link>
        </div>
        {taskCounts.important > 0 && (
          <div className='px-2 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800'>
            <Link href="/important" onClick={() => closeSidebar()}
              className='flex gap-2 items-center justify-between'>
              <div className='flex items-center gap-5'>
                <StarIcon className='w-6 h-6 text-accent-pink-foreground' />
                Important
              </div>
              <div className='text-muted-foreground'>
                {taskCounts.important}
              </div>
            </Link>
          </div>
        )}
        {/* add a new div: "Due Today" */}
        <div className='px-2 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800'>
          <Link href="/tasks" onClick={() => closeSidebar()}
            className='flex gap-2 items-center justify-between'>
            <div className='flex items-center gap-5'>
              <HomeIcon className='w-6 h-6 text-accent-blue-foreground' />
              Tasks
            </div>
            <div className='text-muted-foreground'>
              {taskCounts.tasks}
            </div>
          </Link>
        </div>
        <Separator />
      </div>
      {/* TODO: add lists here */}
    </div>
  )
}

export default Sidebar