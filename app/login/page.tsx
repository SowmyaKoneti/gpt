'use client';

import LoginForm from '@/components/LoginForm';

export default function LoginPage() {
    return (
        <main>
            <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
                <h1 className="text-4xl font-bold mb-6 text-black">Login to continue</h1>
                <LoginForm />
            </div>
        </main>
    );
}
