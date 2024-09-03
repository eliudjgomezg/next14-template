import type { Metadata } from 'next'

import 'assets/styles/colors.css'
import 'assets/styles/html-core.css'
import 'assets/styles/globals.css'
import 'assets/styles/globals.css'
import { montserrat } from 'assets/styles/fonts'
import { LoaderContextProvider } from 'context/LoaderContext'
import AuthSessionProvider from 'providers/SessionProvider'
import SnackBarProvider from 'providers/SnackBarProvider'
import TanstackProvider from 'providers/TanstackProvider'

export const metadata: Metadata = {
  title: 'Next skeleton',
  description: 'Next starter boilerplate',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={montserrat.className}>
        <AuthSessionProvider>
          <TanstackProvider>
            <LoaderContextProvider>
              <SnackBarProvider>{children}</SnackBarProvider>
            </LoaderContextProvider>
          </TanstackProvider>
        </AuthSessionProvider>
      </body>
    </html>
  )
}
