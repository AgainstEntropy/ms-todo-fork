import { TaskListType } from "@/lib/schema"

export type TaskCountsType = {
    myDay: number,
    inPlan: number,
    important: number,
    tasks: number,
}

export type ListCountsType = {
    list: TaskListType,
    count: number,
}