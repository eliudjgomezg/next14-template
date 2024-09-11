import type { Metadata } from 'next'

import 'assets/styles/colors.css'
import 'assets/styles/html-core.css'
import 'assets/styles/globals.css'
import 'assets/styles/globals.css'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter'

import { montserrat } from 'assets/styles/fonts'
import { LoaderContextProvider } from 'context/LoaderContext'
import { UserContextProvider } from 'context/UserContext'
import AuthSessionProvider from 'providers/SessionProvider'
import SnackBarProvider from 'providers/SnackBarProvider'
import TanstackProvider from 'providers/TanstackProvider'

export const metadata: Metadata = {
  title: {
    template: 'Next skeleton | %s',
    default: 'Next skeleton',
  },
  description: 'Next starter boilerplate',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={montserrat.className}>
        <AuthSessionProvider>
          <TanstackProvider>
            <LoaderContextProvider>
              <UserContextProvider>
                <SnackBarProvider>
                  <AppRouterCacheProvider>{children}</AppRouterCacheProvider>
                </SnackBarProvider>
              </UserContextProvider>
            </LoaderContextProvider>
          </TanstackProvider>
        </AuthSessionProvider>
      </body>
    </html>
  )
}
