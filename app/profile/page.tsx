'use client';

import { useEffect, useState } from "react";

export default function ProfilePage() {
    const [name, setName] = useState('');
    const [bio, setBio] = useState('');
    const [loading, setLoading] = useState(true);
    const [success, setSuccess] = useState(false);

    //loading current user profile
    useEffect(() => {
        const loadProfile = async () => {
            const res = await fetch('/api/profile');
            const data = await res.json();
            if (data?.name) setName(data.name);
            if (data?.bio) setBio(data.bio);
            setLoading(false);
        };
        loadProfile();
    }, []);

    //handle submit
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSuccess(false);
        const res = await fetch('/api/profile', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, bio }),
        });
        if (res.ok) {
            setSuccess(true);
        }
    };
    if (loading) return <div className="p-4 text-white">Loading profile</div>
    return (
        <main className="max-w-xl mx-auto p-6 text-white">
            <h1 className="text-2xl font-bold mb-4">🧑 Create or Update Your Profile</h1>
            {success && <p className="mb-4 text-green-500">✅ Profile saved!</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Name</label>
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-3 py-2 rounded bg-gray-800 text-white"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Bio</label>
                    <textarea
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        className="w-full px-3 py-2 rounded bg-gray-800 text-white"
                    />
                </div>
                <button
                    type="submit"
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded text-white"
                >
                    Save Profile
                </button>
            </form>
        </main>
    )
}