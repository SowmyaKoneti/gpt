'use client';
import { useState } from 'react';

export default function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault(); //preventing default load when submitted
        console.log('Logging with:', email, password);
    }
    return (
        <form onSubmit={handleSubmit} className='space-y-4'>
            <div>
                <label htmlFor='email' className='block text-sm font-medium text-black' >Email</label>
                <input
                    id='email'
                    type='email'
                    value={email}
                    required
                    onChange={e => setEmail(e.target.value)}
                    className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500 text-black'
                    placeholder='Enter your email'
                />
            </div>
            <div>
                <label htmlFor='password' className='block text-sm font-medium text-black'>Password</label>
                <input
                    id='password'
                    type='password'
                    value={password}
                    required
                    onChange={e => setPassword(e.target.value)}
                    className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500 text-black'
                    placeholder='Enter your password'
                />
            </div>
            <button type='submit' className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800">
                Login
            </button>
        </form>
    )
}