import { Task } from "@/types/task"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog"
import { Button } from "./ui/button"
import { MdDelete } from "react-icons/md"
import deleteTask from "@/actions/delete-task"


export default function DeleteDialog({task}: {task: Task}) {

  function deletaTask(task: Task) {
    deleteTask(task.id);
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button variant="destructive" className="w-full">
          <MdDelete className="w-5 h-5" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Delete Task
          </AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete &ldquo;{task.title}&rdquo;.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction className="bg-red-500 hover:bg-red-400"
            onClick={() => deletaTask(task)}>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}