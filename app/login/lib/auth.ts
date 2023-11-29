import { NextAuthOptions, User, getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { redirect } from "next/navigation";

import { getUsers } from "@/services/users";

// import GithubProvider from 'next-auth/providers/github';

export const authConfig: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Sign in",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials || !credentials.email || !credentials.password)
          return null;

        const users = await getUsers();

        for (const dbUser in users) {
          if (
            users &&
            users[dbUser].password === credentials.password &&
            users[dbUser].email === credentials.email
          ) {
            // const { password, createdAt, id, ...dbUserWithoutPassword } =
            //   dbUser;
            console.log("You are logged as:" + users[dbUser].email);
            return users[dbUser] as User;
          }
        }

        //Verify Password here
        //We are going to use a simple === operator
        //In production DB, passwords shou // if (dbUser && dbUser.password === credentials.password) {
        //   const { password, createdAt, id, ...dbUserWithoutPassword } = dbUser;
        //   return dbUserWithoutPassword as User;
        // }ld be encrypted using something like bcrypt...

        return null;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    // GithubProvider({
    //   clientId: process.env.GITHUB_CLIENT_ID as string,
    //   clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    // }),
  ],
};

export async function loginIsRequiredServer() {
  const session = await getServerSession(authConfig);
  console.log(session);
  if (!session) return redirect("/login");
}

// export function loginIsRequiredClient() {
//   if (typeof window !== "undefined") {
//     const session = useSession();
//     const router = useRouter();
//     if (!session) router.push("/login");
//   }
// }
