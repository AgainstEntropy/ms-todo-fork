import { ModeToggle } from "@/components/mode-toggle";
import SigninBtn from "@/components/signin-btn";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import Link from "next/link";

export default async function Home() {
  const session = await auth();
  return (
    <div className="flex h-screen w-screen justify-center items-center">
      <div className="flex flex-col gap-8 text-center">
        <ModeToggle />
        <h1 className="text-4xl">Microsoft Todo Fork</h1>
        {session ? (
          <div>
              <p className="mb-6">Signed-in as {session.user.name}</p>
              <Link href={"/tasks"}>
                <Button> Go to Tasks </Button>
              </Link>
          </div>
        ) : (
          <SigninBtn />
        )}
      </div>
    </div>
  );
}
