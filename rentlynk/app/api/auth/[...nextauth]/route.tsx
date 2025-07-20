// File: app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
  ],
  // Used to encrypt session tokens, rotate them, etc.
  secret: process.env.NEXTAUTH_SECRET,
};

// In the App Router you need to handle both GET and POST
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
