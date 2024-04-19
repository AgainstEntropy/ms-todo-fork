import { DrizzleAdapter } from "@auth/drizzle-adapter";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcrypt";
import { db } from "./db";
import { eq } from "drizzle-orm";
import { users } from "./schema";
import GitHub from "next-auth/providers/github";

function passwordToSalt(password: string) {
    const saltRounds = 10;
    const hash = bcrypt.hashSync(password, saltRounds);
    return hash;
}

async function getUserFromDb(username: string) {
    const user = await db.query.users.findFirst({
        where: eq(users.name, username),
    });
    return user;
}

async function addUserToDb(username: string, saltedPassword: string) {
    const user = await db
        .insert(users)
        .values({
            id: crypto.randomUUID(),
            name: username,
            password: saltedPassword,
            email: "",
        })
        .returning();
    return user.pop();
}

export const {
    handlers: { GET, POST },
    auth,
    // SignIn,
    // SignOut,
} = NextAuth({
    adapter: DrizzleAdapter(db),
    providers: [
        // Providers...
        GitHub,
        Credentials({
            // name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials, req) {
                const username = credentials.username as string;
                const password = credentials.password as string;
                if (!username || !password) {
                    return null;
                }
                const user = await getUserFromDb(username);
                if (!user) {
                    throw new Error("User does not exist");
                }
                if (!user.password) {
                    return null;
                }
                const isValid = await bcrypt.compare(password, user.password);
                if (!isValid) {
                    throw new Error("Invalid password");
                }
                return user;
            },
        })
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