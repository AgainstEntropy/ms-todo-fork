import { DrizzleAdapter } from "@auth/drizzle-adapter";
import NextAuth from "next-auth";
import { db } from "./db";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";


export const {
    handlers: { GET, POST },
    auth,
    // SignIn,
    // SignOut,
} = NextAuth({
    adapter: DrizzleAdapter(db),
    providers: [
        // Providers...
        GitHub({allowDangerousEmailAccountLinking: true}),
        Google
    ],
    callbacks: {
        async session({ session, user, token }) {
            session.user.id = token.sub as string;
            return session;
        },
    },
    session: {
        strategy: "jwt",
    },
});