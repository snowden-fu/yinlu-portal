import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "用户名", type: "text" },
        password: { label: "密码", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          console.log('Missing credentials');
          return null;
        }

        // 允许任何用户名和密码登录
        return {
          id: '1',
          username: credentials.username,
          name: credentials.username,
        };

        // 注释掉原来的测试用户验证代码
        /*
        if (credentials.username === TEST_USER.username) {
          const isValid = await compare(credentials.password, TEST_USER.password);
          console.log('Password check:', { isValid, username: credentials.username });
          if (isValid) {
            return TEST_USER;
          }
        }
        */

        // console.log('Auth failed for user:', credentials.username);
        // return null;
      }
    })
  ],
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30天
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.userId = user.id;
        token.username = user.username;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.userId;
        session.user.username = token.username;
      }
      return session;
    }
  }
}; 