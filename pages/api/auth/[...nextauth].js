import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "baotran" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        const res = await fetch(`${process.env.BASE_URL}/api/login/route`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'authorization': process.env.CREDENTIALS_TOKEN
          },
          body: JSON.stringify({
            username: credentials?.username,
            password: credentials?.password
          })
        })
        const user = await res.json();

        if (user) {
          return user;
        } else {
          return null;
        }
      }
    })
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user }
    },
    async session({ session, token }) {
      session.user = token;
      return session;
    }
  }
}
export default NextAuth(authOptions)