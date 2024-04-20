import {
  Drawer,
  DrawerContent,
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
import { cn } from "@/lib/utils"
import { SunIcon } from "@radix-ui/react-icons"
import { Separator } from "./ui/separator"
import DeleteDialog from "./delete-dialog"
import DatePicker from "./date-picker"

export default function TaskDrawer({ task }: { task: Task }) {

  async function updateTitle(task: Task, title: string) {
    await updateTask(task.id, { title });
  }

  async function updateDescription(task: Task, description: string) {
    await updateTask(task.id, { description });
  }

  async function addToMyDay(task: Task) {
    await updateTask(task.id, {
      addedToMyDayManually: true,
    });
  }

  async function removeFromMyDay(task: Task) {
    await updateTask(task.id, {
      addedToMyDayManually: false,
      addedToMyDayAutomatically: false,
    });
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
          {(task.addedToMyDayManually || task.addedToMyDayAutomatically) ?
            (
              <Button className="bg-accent-green-foreground hover:bg-accent-green-foreground/80"
                onClick={() => removeFromMyDay(task)}>
                <SunIcon className="w-5 h-5 mr-2" /> Remove from My Day
              </Button>
            ) : (
              <Button variant="outline"
                onClick={() => addToMyDay(task)}>
                <SunIcon className="w-5 h-5 mr-2" /> Add to My Day
              </Button>
            )
          }
          <DatePicker task={task} />
        </div>
        <DrawerFooter>
          <div className="flex flex-col text-center gap-4">
            <Separator className="w-full" />
            {task.isCompleted ? (
              <span> Completed on {task.completeDate || "null"}</span>
            ) : (
              <span> Created on {task.createdAt || "null"}</span>
            )}
            <DeleteDialog task={task} />
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}