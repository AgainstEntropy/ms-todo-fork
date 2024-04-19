import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { Label } from "./ui/label"
import { Button } from "./ui/button"
import { Task } from "@/types/task"
import updateTask from "@/actions/update-task"
import { cn, getFormatDate } from "@/lib/utils"
import { SunIcon } from "@radix-ui/react-icons"

export default function TaskDrawer({ task }: { task: Task }) {

    function updateTitle(task: Task, title: string) {
        updateTask(task.id, { title });
    }

    function updateDescription(task: Task, description: string) {
        updateTask(task.id, { description });
    }

    function addToMyDay(task: Task) {
        updateTask(task.id, { addedToMyDayOn: getFormatDate() });
    }

    function removeFromMyDay(task: Task) {
        updateTask(task.id, { addedToMyDayOn: null });
    }

    return (
        <Drawer>
            <DrawerTrigger className={cn(
                "w-full text-left text-sm -translate-y-0.5",
                task.isCompleted && "line-through text-muted-foreground"
            )}>
                {task.title}
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>Edit Task</DrawerTitle>
                    {/* <DrawerDescription>This action cannot be undone.</DrawerDescription> */}
                </DrawerHeader>
                <div className="px-4 flex flex-col gap-4">
                    <div>
                        <Label htmlFor="title">Title</Label>
                        <Input type="text" name="title" defaultValue={task.title}
                            onChange={(e) => updateTitle(task, e.target.value)}
                        />
                    </div>
                    <div>
                        <Label htmlFor="description">Description</Label>
                        <Textarea name="description" placeholder="Add description" defaultValue={task.description ?? ""}
                            onChange={(e) => updateDescription(task, e.target.value)}
                        />
                    </div>
                </div>
                <DrawerFooter>
                    {task.addedToMyDayOn &&
                        task.addedToMyDayOn === getFormatDate() ?
                        (
                            <Button className="bg-accent-green-foreground hover:bg-accent-green-foreground/50" 
                                onClick={() => removeFromMyDay(task)}>
                                <SunIcon className="w-5 h-5 mr-2"/> Remove from My Day
                            </Button>
                        ) : (
                            <Button variant="outline" 
                                // className="hover:bg-accent-green-foreground/25"
                                onClick={() => addToMyDay(task)}>
                                <SunIcon className="w-5 h-5 mr-2"/> Add to My Day
                            </Button>
                        )
                    }
                    <DrawerClose>
                        <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>

    )
}