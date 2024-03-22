import Navbar from '@/components/fragments/Navbar'
import '@/styles/globals.css'
import { SessionProvider } from 'next-auth/react'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'

const disableNavbar = ['auth', 'admin']

export default function App({
  Component,
  pageProps: { session, ...pageProps } }: AppProps) {

  const router = useRouter()
  return (
    <SessionProvider session={session}>
      {!disableNavbar.includes(router.pathname.split('/')[1]) && <Navbar />}
      <Component {...pageProps} />
    </SessionProvider>
  )
}
