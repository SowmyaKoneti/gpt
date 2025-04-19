'use client';

import { useUser } from '@clerk/nextjs';
import { useClerk } from '@clerk/nextjs'

export default function DashboardPage() {
    const { isSignedIn, user, isLoaded } = useUser();
    const { signOut } = useClerk()

    if (!isLoaded) return <div>Loading...</div>;
    if (!isSignedIn) return null;

    return (
        <main className="p-6">
            <h1 className="text-2xl font-bold mb-4">
                Welcome!!, {user.firstName || user.username}
            </h1>
            <button onClick={() => signOut({ redirectUrl: '/login' })}>
                Signout
            </button>
        </main>
    );
}
