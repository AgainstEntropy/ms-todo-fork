"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "./ui/button";

export default function SigninBtn() {
    return (
        <Button onClick={() => signIn()}>Sign in</Button>
    )
    const { data: session } = useSession();
    if (session) {
        return (
            <div>
                Signin as {session.user.name}
                <br/>
                <Button onClick={() => signOut()}>Sign out</Button>
            </div>
          );
    }
    
    return (
        <div>
            <Button onClick={() => signIn()}>Sign in</Button>
        </div>
    );
}