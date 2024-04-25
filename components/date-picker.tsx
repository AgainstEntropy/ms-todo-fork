"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn, getToday, formatDate } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import updateTask from "@/actions/update-task"
import { TaskType } from "@/lib/schema";

type TaskDateSchema = {
  dueDate: string | null;
  addedToMyDayAutomatically?: boolean;
}

export default function DatePicker({ task }: { task: TaskType }) {
  const [date, setDate] = React.useState<Date | null>(
    task.dueDate ? new Date(task.dueDate) : null
  );

  const handleSelect = async (date?: Date) => {
    setDate(date ? date : null);

    const updateData: TaskDateSchema = {
      dueDate: date ? formatDate(date.toISOString()) : null,
    }

    updateData.addedToMyDayAutomatically = false;
    if (updateData.dueDate && updateData.dueDate === getToday()) {
      updateData.addedToMyDayAutomatically = true;
    }
    updateTask(task.id, updateData);
  }

  return (
    <Popover>
      <PopoverTrigger className="w-full">
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a due date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date ? date : undefined}
          onSelect={handleSelect}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}
