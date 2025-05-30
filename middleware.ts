// middleware.ts
import { clerkMiddleware } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export default clerkMiddleware();

export const config = {
    matcher: ['/((?!api|_next|.*\\..*).*)'],
};
