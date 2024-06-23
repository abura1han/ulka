import NextAuth, { NextAuthConfig } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const nextAuthOptions: NextAuthConfig = {
  providers: [
    GoogleProvider({
      name: "google",
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],

  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      console.log("sign in", { user });

      return true;
    },
    async session({ session, user, token }) {
      console.log("session", { session, user });
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      console.log("jwt", { user });
      if (account) {
        console.log(user, token, account);
        // call the signToken function which returns a JWT token
        // const token = await SignToken(user?.email as string);
        token.user = user;
      }
      return token;
    },
  },

  session: {
    strategy: "jwt",
    maxAge: 1 * 24 * 60 * 60, // 1 day
  },

  secret: process.env.NEXTAUTH_SECRET,
};

export const { handlers, auth, signIn, signOut } = NextAuth(nextAuthOptions);
