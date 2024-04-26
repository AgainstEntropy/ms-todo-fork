import Link from 'next/link'
import React from 'react'
import { usePathname } from 'next/navigation'
import AvatarMenu from './avatar-menu'
import SearchBar from './search-bar'
import { cn } from '@/lib/utils'

import { createList } from '@/actions/list'

import { Separator } from './ui/separator'
import { HomeIcon, SunIcon, StarIcon, LayoutIcon, HamburgerMenuIcon, PlusIcon } from '@radix-ui/react-icons'

import { ListCountsType, TaskCountsType } from '@/types/tasks-counts'
import { Button } from './ui/button'
// import { ListContextMenu } from './list-context'


const Sidebar = ({ 
  taskCounts,
  listCounts,
}: { 
  taskCounts: TaskCountsType,
  listCounts: ListCountsType[],
}) => {

  const pathname = usePathname();

  const contents = [
    { count: taskCounts.myDay, href: "/myday", label: "My Day", icon: <SunIcon className='w-5 h-5 text-accent-green-foreground' />, hiddenClassName: "" },
    { count: taskCounts.inPlan, href: "/inplan", label: "Planned", icon: <LayoutIcon className='w-5 h-5 text-inplan-foreground' />, hiddenClassName: taskCounts.inPlan === 0 && "hidden"},
    { count: taskCounts.important, href: "/important", label: "Important", icon: <StarIcon className='w-5 h-5 text-important-foreground' />, hiddenClassName: taskCounts.important === 0 && "hidden"},
    { count: taskCounts.tasks, href: "/tasks", label: "Tasks", icon: <HomeIcon className='w-5 h-5 text-task-foreground' />, hiddenClassName: ""},
  ]

  return (
    <div className='h-full w-full flex flex-col justify-between'>
      <div className='flex flex-col gap-2 p-2'>
        <div className='pl-1 mb-2'>
          <AvatarMenu />
        </div>
        <div className='mb-2'>
          <SearchBar placeholder="Search" />
        </div>
        {contents.map((content, index) => (
          <div key={index} className={cn(
            content.hiddenClassName,
            "p-2 rounded hover:bg-gray-200/50 hover:dark:bg-gray-800",
            pathname === content.href && "bg-gray-200/50 dark:bg-gray-800"
          )}>
            <Link href={content.href}
              className='flex gap-2 items-center justify-between'>
              <div className='flex items-center gap-5'>
                {content.icon}
                {content.label}
              </div>
              {content.count > 0 && (
                <div className="flex min-w-4 h-4 p-1 justify-center items-center text-xs rounded-full bg-gray-200 dark:bg-gray-200/10">
                  {content.count}
                </div>
              )}
            </Link>
          </div>
        ))}
        <Separator className='bg-foreground/10'/>
        {/* TODO: add list groups here */}
        {listCounts.map((item, index) => (
          <div key={index} className='p-2 rounded hover:bg-gray-200/50 hover:dark:bg-gray-800'>
            <Link href={`/lists/${item.list.id}`}
              className='flex gap-2 items-center justify-between'>
              <div className='flex items-center gap-5'>
                <HamburgerMenuIcon className='w-5 h-5 text-task-foreground' />
                {item.list.title}
              </div>
              {item.count > 0 && (
                <div className="flex min-w-4 h-4 p-1 justify-center items-center text-xs rounded-full bg-gray-200 dark:bg-gray-200/10">
                  {item.count}
                </div>
              )}
            </Link>
          </div>
        ))}
      </div>
      <Button variant={'ghost'}
        className={cn(
          "w-full justify-start text-left font-normal rounded-sm",
          "hover:bg-gray-200/50 hover:dark:bg-gray-800"
        )}
        onClick={() => createList("Untitled list")}
      >
        <PlusIcon className='mr-2' /> Create new list
      </Button>
    </div>
  )
}

export default Sidebar