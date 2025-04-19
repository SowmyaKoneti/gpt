'use client';

import { useState, useEffect } from 'react';
import { useSignIn, useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const { signIn, isLoaded } = useSignIn();
    const { isSignedIn, isLoaded: authLoaded } = useAuth();
    const router = useRouter();

    // Redirect if already signed in
    useEffect(() => {
        if (authLoaded && isSignedIn) {
            router.push('/dashboard');
        }
    }, [authLoaded, isSignedIn, router]);

    const handleSubmit = async (e: React.FormEvent) => {
        // e.preventDefault();
        setErrorMsg('');

        if (!isLoaded || isSignedIn) return;

        try {
            const result = await signIn.create({
                identifier: email,
                password,
            });

            if (result.status === 'complete') {
                router.push('/dashboard'); // Manual redirect here
            } else {
                console.log('Additional steps required:', result);
            }
        } catch (err: any) {
            console.log('Login error:', err);
            setErrorMsg(err.errors?.[0]?.message || 'Login failed');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {errorMsg && <p className="text-red-600 text-sm">{errorMsg}</p>}

            <div>
                <label htmlFor="email" className="block text-sm font-medium text-black">
                    Email
                </label>
                <input
                    id="email"
                    type="email"
                    value={email}
                    required
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-black"
                    placeholder="Enter your email"
                />
            </div>

            <div>
                <label htmlFor="password" className="block text-sm font-medium text-black">
                    Password
                </label>
                <input
                    id="password"
                    type="password"
                    value={password}
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-black"
                    placeholder="Enter your password"
                />
            </div>

            <button type="submit" className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800">
                Login
            </button>
        </form>
    );
}
