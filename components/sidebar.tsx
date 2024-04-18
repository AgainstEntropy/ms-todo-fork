import Link from 'next/link'
import React from 'react'

const Sidebar = () => {
  return (
    <div>
        <ul>
            <li>
                <Link href="/myday"> My Day </Link>
            </li>
            <li>
                <Link href="/important"> Important </Link>
            </li>
            <li>
                <Link href="/tasks"> Tasks </Link>
            </li>
        </ul>
    </div>
  )
}

export default Sidebar