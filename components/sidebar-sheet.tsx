import { HamburgerMenuIcon } from "@radix-ui/react-icons"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "./ui/sheet"
import { ReactNode } from "react"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"


export default function SidebarSheet({
  children,
}: {
  children: ReactNode
}) {

  const pathname = usePathname();

  return (
    <Sheet>
      <SheetTrigger>
        <div className={cn(
          "rounded p-2 mb-2 -translate-x-1.5 hover:bg-gray-800/20",
          pathname === "/tasks" && "text-white hover:text-white",
        )}>
          <HamburgerMenuIcon className="w-5 h-5" />
        </div>
      </SheetTrigger>
      <SheetContent side={"left"} className="w-72">
        <SheetClose>
          {children}
        </SheetClose>
      </SheetContent>
    </Sheet>
  )
}