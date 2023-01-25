'use client';

import { useEffect, useState } from 'react';
import Logout from './Logout';

export default function Header() {
    const [username, setUsername] = useState('');

    useEffect(() => {
        const firstName = localStorage.getItem('firstName') || '';
        const lastName = localStorage.getItem('lastName') || '';
        setUsername(firstName + ' ' + lastName);
    }, [username])

    return (
        <header className='h-14 flex justify-between items-center border px-6'>
            <span className='text-gray-700 text-2xl'>
                {/* Search Bar */}
            </span>
            <div className='flex items-center space-x-2'>
                <span className='text-sm'>
                    Welcome, {username}
                </span>
                <div className='flex items-center justify-center w-8 h-8 rounded-full bg-[#2e8cca]'>
                    <span className='text-white'>
                        <Logout username={username} />
                    </span>
                </div>
            </div>
        </header>
    )
}