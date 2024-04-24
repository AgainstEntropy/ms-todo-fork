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
                <p className="text-white">
                    We couldn&apos;t find what you&apos;re looking for.
                </p>
            )
            }
        </div>
    );
};

export default Page;