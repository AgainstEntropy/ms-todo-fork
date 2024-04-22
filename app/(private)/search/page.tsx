import { fetchFilteredTasks } from "@/app/lib/data";
import TaskList from "@/components/task-list";


const Page = async ({
    searchParams,
}: {
    searchParams: {
        query: string;
    };
}) => {

    const res = await fetchFilteredTasks(searchParams.query);

    return (
        <div>
            {res.length > 0 ? (
                <TaskList tasks={res} />
            ) : (
                <p>No task found with provided key word</p>
            )
            }
        </div>
    );
};

export default Page;