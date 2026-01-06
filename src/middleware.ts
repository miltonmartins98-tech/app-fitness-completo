import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Rotas públicas que não precisam de autenticação
  const publicRoutes = ['/auth']
  const isPublicRoute = publicRoutes.some(route => req.nextUrl.pathname.startsWith(route))

  // Se não está autenticado e não está em rota pública, redireciona para login
  if (!session && !isPublicRoute) {
    return NextResponse.redirect(new URL('/auth', req.url))
  }

  // Se está autenticado e tenta acessar /auth, redireciona para home
  if (session && req.nextUrl.pathname === '/auth') {
    return NextResponse.redirect(new URL('/', req.url))
  }

  return res
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
}
