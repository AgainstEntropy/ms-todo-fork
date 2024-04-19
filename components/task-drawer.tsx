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
import { Task } from "@/types/task"
import UpdateTask from "@/actions/update-task"

export default function TaskDrawer({task}: {task: Task}) {

    function updateTitle(task: Task, title: string) {
        UpdateTask(task.id, {title});
    }

    function updateDescription(task: Task, description: string) {
        UpdateTask(task.id, {description});
    }

    return (
        <Drawer>
            <DrawerTrigger className="w-full text-left">{task.title}</DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>Edit Task</DrawerTitle>
                    {/* <DrawerDescription>This action cannot be undone.</DrawerDescription> */}
                </DrawerHeader>
                <div className="p-4">
                    <Label htmlFor="title">Title</Label>
                    <Input type="text" name="title" defaultValue={task.title} 
                        onChange={(e) => updateTitle(task, e.target.value)}
                    />
                    <Label htmlFor="description">Description</Label>
                    <Textarea name="description" placeholder="Add description" defaultValue={task.description ?? ""} 
                        onChange={(e) => updateDescription(task, e.target.value)}
                    />
                </div>
                {/* <DrawerFooter>
                    <Button>Submit</Button>
                    <DrawerClose>
                        <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                </DrawerFooter> */}
            </DrawerContent>
        </Drawer>

    )
}