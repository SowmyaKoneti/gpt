'use client';
import React, { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { useClerk } from '@clerk/nextjs'

export default function DashboardPage() {

    const { signOut } = useClerk()
    const { user, isLoaded } = useUser()
    const [input, setInput] = useState('')
    const [messages, setMessages] = useState([
        { role: 'assistant', content: 'Hello! How can I help you today?' }
    ])
    if (!isLoaded) return null;
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const userMsg = { role: 'user', content: input };
        setMessages((prev) => [...prev, userMsg]);
        setInput('');

        const res = await fetch('/api/groq', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: input,
            }),
        });

        const data = await res.json();
        const assistantMsg = { role: 'assistant', content: data.reply };
        setMessages((prev) => [...prev, assistantMsg]);
    };

    return (

        <div className="flex flex-col h-screen bg-[#343541] text-white">
            {/* top bar */}
            <header className="p-4 border-b border-gray-700">
                <div className="flex justify-between items-center">
                    <h1 className="text-xl font-semibold">Welcome {user?.lastName || 'Alien'}</h1>
                    <button
                        onClick={() => signOut({ redirectUrl: '/login' })}
                        className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded"
                    >
                        Logout
                    </button>
                </div>
            </header>

            {/* messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {messages.map((msg, i) => (
                    <div
                        key={i}
                        className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'} mb-2`}
                    >
                        <div
                            className={`max-w-[80%] p-4 rounded-xl shadow ${msg.role === 'user'
                                ? 'bg-blue-500 text-white rounded-br-none'
                                : 'bg-gray-700 text-white rounded-bl-none'
                                }`}
                        >
                            <p className="whitespace-pre-wrap">{msg.content}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* input area */}
            <form onSubmit={handleSubmit} className="p-4 border-t border-gray-700">
                <div className="flex gap-2">
                    <input
                        type="text"
                        placeholder="Send a message..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="flex-1 px-4 py-2 rounded bg-gray-800 text-white focus:outline-none"
                    />
                    <button
                        type="submit"
                        className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded"
                    >
                        Send
                    </button>
                </div>
            </form>
        </div >
    );
}
