"use client";

import CompleteTask from "@/actions/complete-task";
import { Checkbox } from "./ui/checkbox";

import { Task } from "@/types/task";
import TaskDrawer from "./task-drawer";

export default function TaskList({ tasks }: { tasks: Task[] }) {

    async function checkTask(task: Task) {
        await CompleteTask(task.id, true);
    }

    return (
        <div className="flex flex-col gap-1 justify-between text-accent-blue-foreground">
            {tasks.map((task) => (
                <div key={task.id}
                    className="flex items-center bg-accent hover:bg-sky-100 rounded text-foreground">
                    <div className="p-3">
                        <Checkbox checked={task.isCompleted as boolean}
                            onClick={() => checkTask(task)} />
                    </div>
                    <div className="flex-auto">
                        <TaskDrawer task={task}/>
                    </div>
                </div>
            ))}
        </div>
    );
}