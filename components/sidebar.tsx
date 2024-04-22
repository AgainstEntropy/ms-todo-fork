import { TaskCountsType } from '@/types/tasks-counts'
import { HomeIcon, SunIcon, StarIcon, LayoutIcon } from '@radix-ui/react-icons'
import Link from 'next/link'
import React from 'react'
import { Separator } from './ui/separator'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import AvatarMenu from './avatar-menu'
import SearchBar from './search-bar'


const Sidebar = async ({ taskCounts }: { taskCounts: TaskCountsType }) => {

  const pathname = usePathname();

  const contents = [
    { count: taskCounts.myDay, href: "/myday", label: "My Day", icon: <SunIcon className='w-5 h-5 text-accent-green-foreground' />, hiddenClassName: "" },
    { count: taskCounts.inPlan, href: "/inplan", label: "In Plan", icon: <LayoutIcon className='w-5 h-5 text-inplan-foreground' />, hiddenClassName: taskCounts.inPlan === 0 && "hidden"},
    { count: taskCounts.important, href: "/important", label: "Important", icon: <StarIcon className='w-5 h-5 text-important-foreground' />, hiddenClassName: taskCounts.important === 0 && "hidden"},
    { count: taskCounts.tasks, href: "/tasks", label: "Tasks", icon: <HomeIcon className='w-5 h-5 text-task-foreground' />, hiddenClassName: ""},
  ]

  return (
    <div className='w-full flex flex-col gap-2 p-2'>
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
            <div className="flex min-w-4 h-4 p-1 justify-center items-center text-xs rounded-full bg-gray-200">
              {content.count}
            </div>
          </Link>
        </div>
      ))}
      <Separator />
      {/* TODO: add lists here */}
    </div>
  )
}

export default Sidebar