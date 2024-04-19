import Link from "next/link";
import { CheckboxIcon } from "@radix-ui/react-icons";

import { ModeToggle } from "@/components/mode-toggle";
import AvatarMenu from "./avatar-menu";

export default function Header() {
    return (
        <div className="flex justify-between p-5">
            <Link href="/">
                <CheckboxIcon className="h-10 w-10" />
            </Link>
            <div className="flex items-center gap-x-6">
                <ModeToggle />
                <AvatarMenu />
            </div>
        </div>
    );
}