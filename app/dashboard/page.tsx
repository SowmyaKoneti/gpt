'use client';

import { useUser } from '@clerk/nextjs';
import { useClerk } from '@clerk/nextjs'

export default function DashboardPage() {

    const { signOut } = useClerk()

    const { user } = useUser();


    return (
        <main className="p-6">
            <h1 className="text-2xl font-bold mb-4">
                Welcome!!, {user?.firstName} {user?.lastName}
            </h1>
            <button onClick={() => signOut({ redirectUrl: '/login' })}>
                Signout
            </button>
        </main>
    );
}
