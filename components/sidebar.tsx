import { TaskCountsType } from '@/types/tasks-counts'
import { HomeIcon, SunIcon, StarIcon, LayoutIcon } from '@radix-ui/react-icons'
import Link from 'next/link'
import React from 'react'
import { Separator } from './ui/separator'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const Sidebar = ({
  taskCounts,
  closeSidebar
}: {
  taskCounts: TaskCountsType
  closeSidebar: Function
}) => {
  const pathname = usePathname();

  const itemClassNameShared = "p-2 rounded hover:bg-gray-100 hover:dark:bg-gray-800";
  const itemClassNameHighlight = "bg-gray-100 dark:bg-gray-800";

  const countLabelClassName = "flex min-w-4 h-4 p-1 justify-center items-center text-xs rounded-full bg-gray-200";

  return (
    <div>
      {/* TODO: add a search bar here */}
      <div className='flex flex-col gap-2 p-2'>
        <div className={cn(
          itemClassNameShared,
          pathname === "/myday" && itemClassNameHighlight
        )}>
          <Link href="/myday" onClick={() => closeSidebar()}
            className='flex gap-2 items-center justify-between'>
            <div className='flex items-center gap-5'>
              <SunIcon className='w-5 h-5 text-accent-green-foreground' />
              My Day
            </div>
            <div className={countLabelClassName}>
              {taskCounts.myDay}
            </div>
          </Link>
        </div>
        <div className={cn(
          itemClassNameShared,
          pathname === "/inplan" && itemClassNameHighlight
        )}>
          <Link href="/inplan" onClick={() => closeSidebar()}
            className='flex gap-2 items-center justify-between'>
            <div className='flex items-center gap-5'>
              <LayoutIcon className='w-5 h-5 text-inplan-foreground' />
              In Plan
            </div>
            <div className={countLabelClassName}>
              {taskCounts.inPlan}
            </div>
          </Link>
        </div>
        {taskCounts.important > 0 && (
          <div className={cn(
            itemClassNameShared,
            pathname === "/important" && itemClassNameHighlight
          )}>
            <Link href="/important" onClick={() => closeSidebar()}
              className='flex gap-2 items-center justify-between'>
              <div className='flex items-center gap-5'>
                <StarIcon className='w-5 h-5 text-important-foreground' />
                Important
              </div>
              <div className={countLabelClassName}>
                {taskCounts.important}
              </div>
            </Link>
          </div>
        )}
        <div className={cn(
          itemClassNameShared,
          pathname === "/tasks" && itemClassNameHighlight
        )}>
          <Link href="/tasks" onClick={() => closeSidebar()}
            className='flex gap-2 items-center justify-between'>
            <div className='flex items-center gap-5'>
              <HomeIcon className='w-5 h-5 text-task-foreground' />
              Tasks
            </div>
            <div className={countLabelClassName}>
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