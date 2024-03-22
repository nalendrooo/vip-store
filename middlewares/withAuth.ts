import { getToken } from "next-auth/jwt";
import {
  NextFetchEvent,
  NextMiddleware,
  NextRequest,
  NextResponse
} from 'next/server'

const onlyAdmin = ['admin']
const authPage = ['auth']

export default function WithAuth(middleware: NextMiddleware, requireAuth: string[] = []) {
  return async (req: NextRequest, next: NextFetchEvent) => {

    const pathname = req.nextUrl.pathname.split('/')[1]

    // cek apakah user sudah login berdasarkan require auth
    if (requireAuth.includes(pathname)) {
      const token = await getToken({
        req,
        secret: process.env.NEXT_AUTH_SECRET
      })

      // jika token tidak ada, maka kembalikan ke login dan berikan callbackurl
      if (!token && !authPage.includes(pathname)) {
        const url = new URL('/auth/login', req.url)
        url.searchParams.set('callbackUrl', encodeURI(req.url))
        return NextResponse.redirect(url)
      }

      if (token) {
        // jika sudah login dan berada di auth url, maka redirect ke /
        if (authPage.includes(pathname)) {
          return NextResponse.redirect(new URL('/', req.url))
        }

        // jika sudah login dan role bukan admin dan berada ri url admin, redirect ke /
        if (token.role !== 'admin' && onlyAdmin.includes(pathname)) {
          return NextResponse.redirect(new URL('/', req.url))
        }
      }
    }
    return middleware(req, next)
  }
}