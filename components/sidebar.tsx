import { HomeIcon, SunIcon, StarIcon } from '@radix-ui/react-icons'
import Link from 'next/link'
import React from 'react'

const Sidebar = ({ onClick: closeSidebar }: { onClick: Function }) => {
    return (
        <div>
            <div className='flex flex-col gap-2'>
                <div className='px-2 py-2 rounded hover:bg-gray-100'>
                    <Link href="/myday" onClick={() => closeSidebar()}
                        className='flex gap-2 items-center justify-between'>
                        <div className='flex items-center gap-5'>
                            <SunIcon className='w-6 h-6 text-accent-green-foreground' />
                            My Day
                        </div>
                        <div className='text-muted-foreground'>3</div>
                    </Link>
                </div>
                <div className='px-2 py-2 rounded hover:bg-gray-100'>
                    <Link href="/important" onClick={() => closeSidebar()}
                        className='flex gap-2 items-center justify-between'>
                        <div className='flex items-center gap-5'>
                            <StarIcon className='w-6 h-6 text-accent-pink-foreground' />
                            Important
                        </div>
                        <div className='text-muted-foreground'>3</div>
                    </Link>
                </div>
                <div className='px-2 py-2 rounded hover:bg-gray-100'>
                    <Link href="/tasks" onClick={() => closeSidebar()}
                        className='flex gap-2 items-center justify-between'>
                        <div className='flex items-center gap-5'>
                            <HomeIcon className='w-6 h-6 text-accent-blue-foreground' />
                            Tasks
                        </div>
                        <div className='text-muted-foreground'>3</div>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Sidebar