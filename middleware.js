
import { NextResponse } from "next/server";

// Define protected routes that require authentication
const protectedRoutes = [
  "/assets",
  "/assetForm1",
  "/assetForm2", 
  "/assetForm3",
  "/assetForm4",
  "/assetForm5",
  "/assetForm6",
  "/assetForm7",
  "/assetForm8",
  "/assetForm9",
  "/admin"
];

// Define public routes that don't require authentication
const publicRoutes = [
  "/",
  "/login",
  "/unauthorized",
  "/api/auth",
  "/debug-auth"
];

function isProtectedRoute(pathname) {
  return protectedRoutes.some(route => pathname.startsWith(route));
}

function isPublicRoute(pathname) {
  return publicRoutes.some(route => pathname.startsWith(route));
}

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Allow public routes
  if (isPublicRoute(pathname)) {
    return NextResponse.next();
  }

  // For protected routes, let the client-side handle authentication
  // The SimpleProtectedRoute component will handle redirects
  if (isProtectedRoute(pathname)) {
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};