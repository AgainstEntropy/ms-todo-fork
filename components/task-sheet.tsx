import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { Label } from "./ui/label"
import { Button } from "./ui/button"
import updateTask from "@/actions/update-task"
import { cn } from "@/lib/utils"
import { SunIcon } from "@radix-ui/react-icons"
import DatePicker from "./date-picker"
import { Separator } from "./ui/separator"
import DeleteDialog from "./delete-dialog"

import { TaskType } from "@/lib/schema";

export default function TaskSheet({ task }: { task: TaskType }) {

  async function updateTitle(task: TaskType, title: string) {
    await updateTask(task.id, { title });
  }

  async function updateDescription(task: TaskType, description: string) {
    await updateTask(task.id, { description });
  }

  async function addToMyDay(task: TaskType) {
    await updateTask(task.id, {
      addedToMyDayManually: true,
    });
  }

  async function removeFromMyDay(task: TaskType) {
    await updateTask(task.id, {
      addedToMyDayManually: false,
      addedToMyDayAutomatically: false,
    });
  }

  return (
    <Sheet>
      <SheetTrigger className={cn(
        "w-full text-left text-sm -translate-y-0.5",
        task.isCompleted && "line-through text-muted-foreground",
        "transition"
      )}>
        {task.title}
      </SheetTrigger>
      <SheetContent side={"right"}>
        <SheetHeader>
          <SheetTitle>Edit Task</SheetTitle>
        </SheetHeader>
        <div className="h-full flex flex-col justify-between">
          <div className="mt-2 flex flex-col gap-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input type="text" name="title" 
                autoFocus={false}
                defaultValue={task.title}
                onChange={(e) => updateTitle(task, e.target.value)}
              />
            </div>
            <div>
              {(task.addedToMyDayManually || task.addedToMyDayAutomatically) ?
                (
                  <Button className="w-full justify-start bg-accent-green-foreground hover:bg-accent-green-foreground/80"
                    onClick={() => removeFromMyDay(task)}>
                    <SunIcon className="w-4 h-4 mr-2" /> Remove from My Day
                  </Button>
                ) : (
                  <Button variant="outline"
                    className="w-full justify-start text-muted-foreground"
                    onClick={() => addToMyDay(task)}>
                    <SunIcon className="w-4 h-4 mr-2" /> Add to My Day
                  </Button>
                )
              }
            </div>
            <div>
              <DatePicker task={task} />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea name="description" placeholder="Add description" defaultValue={task.description ?? ""}
                onChange={(e) => updateDescription(task, e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-col">
            <Separator className="w-full" />
            <div className="m-4 flex items-center justify-center gap-6">
              {task.isCompleted ? (
                <span> Completed on {task.completeDate || "null"}</span>
              ) : (
                <span> Created on {task.createdAt || "null"}</span>
              )}
              <DeleteDialog task={task} />
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}