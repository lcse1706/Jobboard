import { NextAuthOptions, User, getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";

import { getUsers, registerUser } from "@/services/users";

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

        // const dbUser = await prisma.user.findFirst({
        //   where: { email: credentials.email },
        // });

        const dbUser1 = {
          email: "lukaszczarniecki1@gmail.com",
          password: "123",
          id: "1",
          // name?: string | null
          // email?: string | null
          // image?: string | null
          createdAt: "29.10.2023",
        };

        const users = await getUsers();

        //TODO Poprawic walidacje hasla, poniewaz przy jednakowaych haslach wchodzi pierwszy uzytkownik z danych haslem
        for (const dbUser in users) {
          console.log(users[dbUser]);

          if (users && users[dbUser].password === credentials.password) {
            // const { password, createdAt, id, ...dbUserWithoutPassword } =
            //   dbUser;
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
  // console.log(session);
  if (!session) return redirect("/login");
}

// export function loginIsRequiredClient() {
//   if (typeof window !== "undefined") {
//     const session = useSession();
//     const router = useRouter();
//     if (!session) router.push("/login");
//   }
// }
