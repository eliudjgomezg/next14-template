import NextAuth from 'next-auth'
import type { NextAuthConfig, User } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { Session } from 'next-auth/types'

import { UserSession, WhoIAm } from 'definitions/types/Auth'
import { RoutePath } from 'definitions/types/Globals'
import { routes } from 'utils/routes'

const routesList = Object.values(routes)

export const authConfig = {
  debug: true,
  pages: {
    signIn: routes.signIn.path,
  },

  providers: [
    Credentials({
      async authorize({ credentials }) {
        const parsedCredentials = JSON.parse(credentials as string)

        return new Promise<User | null>((resolve, reject) => {
          const { access_token, callbackUrl, ...appUser } = parsedCredentials as WhoIAm
          const session = { ...appUser, tokens: { accessToken: access_token } }
          resolve({ id: 'user', ...session })
          reject(null)
        })
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user, account, session, trigger }) {
      if (trigger === 'update') return { ...token, user: { ...session.user } }

      if (user && account) {
        const currentUser = user as unknown as UserSession
        return {
          accessToken: currentUser.tokens.accessToken,
          refreshToken: currentUser.tokens.refreshToken,
          user: { ...user },
        }
      }
      return token
    },

    async session({ session, token }) {
      const currentSession = token as unknown as Session
      session.user = currentSession.user
      return session
    },

    authorized({ auth, request: { nextUrl } }) {
      const session = auth?.user
      const isLoggedIn = !!session
      const isMainPage = nextUrl.pathname === '/'
      const isOnPlatform = nextUrl.pathname.includes('/plataforma')
      const isOnProfile = nextUrl.pathname.includes('/perfil')
      const isLoginPage = nextUrl.pathname.includes('/iniciar-sesion')

      if (nextUrl.pathname === routes[404].path) return true

      if (isMainPage) return Response.redirect(new URL(routes.signIn.path, nextUrl))

      if (isLoginPage) {
        if (!isLoggedIn) return true
        if (session.role === 'admin') return Response.redirect(new URL(routes.adminHome.path, nextUrl))
      }

      if (isOnPlatform) {
        if (!isLoggedIn) return Response.redirect(new URL(routes.signIn.path, nextUrl))
        if (session.role === 'admin' && session.has_default_password && !isOnProfile) return Response.redirect(new URL(routes.adminProfile.path, nextUrl))

        const currentRoute: RoutePath | undefined = routesList.find((route) => nextUrl.pathname.includes(route.path))

        if (!currentRoute) return Response.redirect(new URL(routes[404].path, nextUrl))
        if (!currentRoute.allowedRoles.length) return true

        const isUserAllowed = currentRoute.allowedRoles.some((role) => session.role === role)
        if (isUserAllowed) return true

        return Response.redirect(new URL(routes[404].path, nextUrl))
      }

      if (isLoggedIn) return true

      return true
    },
  },
} satisfies NextAuthConfig

export const { handlers, auth, signIn, signOut } = NextAuth({ ...authConfig })
