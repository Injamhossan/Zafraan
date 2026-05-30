import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "temp_placeholder_google_id",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "temp_placeholder_google_secret",
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID || "temp_placeholder_facebook_id",
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET || "temp_placeholder_facebook_secret",
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (credentials?.username && credentials?.password) {
          return { id: "user-1", name: "Valued Customer", email: credentials.username };
        }
        return null;
      }
    })
  ],
  secret: process.env.NEXTAUTH_SECRET || "zafraan_jwt_secret_key_2026",
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/my-account",
  },
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }: any) {
      session.accessToken = token.accessToken;
      return session;
    },
  },
});

export { handler as GET, handler as POST };
