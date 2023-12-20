import NextAuth from 'next-auth'
import type { NextAuthConfig } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { Session } from 'next-auth/types'

import { UserSession } from 'definitions/types/Auth'
import { routes } from 'utils/routes'

const routesList = Object.values(routes)

export const authConfig = {
  debug: true,
  pages: {
    signIn: routes.signIn.path,
  },
  providers: [
    Credentials({
      authorize(credentials) {
        if (!credentials) return null
        const user = {
          name: 'Fill Murray',
          email: 'bill@fillmurray.com',
          role: 'admin',
          id: '1',
          tokens: {
            accessToken: 'token-for-apiClient',
            refreshToken: 'token-for-refresh',
          },
        }
        return user
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user, account }) {
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
      const isLoggedIn = !!auth?.user
      const isOnPlatform = nextUrl.pathname.includes('/plataforma')

      if (nextUrl.pathname === routes[404].path) return true

      if (isOnPlatform) {
        if (!isLoggedIn) return false
        const currentRoute: { path: string; allowedRoles: string[] } | undefined = routesList.find((route) => route.path === nextUrl.pathname)

        if (!currentRoute || (auth && !auth.user.role)) return Response.redirect(new URL(routes[404].path, nextUrl))
        if (!currentRoute.allowedRoles.length) return true

        const isUserAllowed = currentRoute.allowedRoles.includes(auth?.user?.role ?? '')
        if (isUserAllowed) return true

        return Response.redirect(new URL(routes[404].path, nextUrl))
      }

      if (isLoggedIn) {
        return Response.redirect(new URL(routes.AdminHome.path, nextUrl)) //Acá defines hacia donde redirige cuando se inicia sesión
      }

      return true
    },
  },
} satisfies NextAuthConfig

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig)
