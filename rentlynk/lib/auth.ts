// File: lib/auth.ts

import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";
import { prisma } from "./db/prisma";

import { userSchema } from "./schemas/userSchema";
import bcrypt from "bcryptjs";
import { encode } from "next-auth/jwt";
import { uuid } from "zod";
// Removed incorrect adapter import

const prismaAdapterInstance = PrismaAdapter(prisma);

export const { handlers, signIn, signOut, auth } = NextAuth({
	adapter: prismaAdapterInstance,
	providers: [
		GitHub({
			clientId: process.env.AUTH_GITHUB_ID!,
			clientSecret: process.env.AUTH_GITHUB_SECRET!,
		}),
		Credentials({
			credentials: {
				email: {},
				password: {},
			},
			authorize: async (credentials) => {
				const { success, data } = userSchema.safeParse(credentials);

				if (success) {
					const { email, password } = data;
					const user = await prisma.user.findUnique({
						where: {
							email: email,
						},
					});
					if (!user || user.password === null) {
						throw new Error("User not found");
					}
					const passWordMatched = await bcrypt.compare(password, user.password);

					if (!passWordMatched) {
						throw new Error("Invalid credential");
					}
					return user;
				}

				return null;
			},
		}),
	],

	session: {
		strategy: "jwt", // or "database" if you want session stored in DB
		maxAge: 30 * 24 * 60 * 60,
	},
	callbacks: {
	async jwt({ token, user }) {
		if (user) {
		token.id = user.id;
		token.email = user.email;
		token.name = user.name;
		token.image = user.image;
		}
		return token;
	},

	async session({ session, token }) {
		session.user = {
		id: token.id as string,
		name: token.name as string,
		email: token.email as string,
		image: token.image as string,
		};
		return session;
	},
	},
	jwt: {
		encode: async function (params) {
			if (params.token?.credentials) {
				const sessionToken = uuid().toString();

				if (!params.token?.sub) {
					throw new Error("NO user id found in the session");
				}

				const createdSession = await prismaAdapterInstance.createSession?.({
					sessionToken: sessionToken,
					userId: params.token.sub!,
					expires: new Date(Date.now() + 30 * 60 * 60 * 1000),
				});

				if (!createdSession) {
					throw new Error("Failed to create session");
				}

				return sessionToken;
			}
			// Fallback to default encode if no credentials
			return encode(params);
		},
	},
	secret: process.env.AUTH_SECRET!,
	debug: true,
});
