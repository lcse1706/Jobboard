import NextAuth from "next-auth/next";

import { authConfig } from "@/app/login/lib/auth";

const handler = NextAuth(authConfig);

export { handler as GET, handler as POST };
