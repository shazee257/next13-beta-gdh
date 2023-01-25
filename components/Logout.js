'use client';

import { useEffect, useState } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useRouter } from 'next/navigation';

export default function Logout() {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [role, setRole] = useState('');

    useEffect(() => {
        const firstName = localStorage.getItem('firstName') || '';
        const lastName = localStorage.getItem('lastName') || '';
        setUsername(firstName + ' ' + lastName);
        setRole(localStorage.getItem('role') || '');
    }, [username])


    const [anchorEl, setAnchorEl] = useState(null);
    const handleClick = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    const handleLogout = async () => {
        localStorage.removeItem('userId');
        localStorage.removeItem('role');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('firstName');
        localStorage.removeItem('lastName');
        localStorage.removeItem('username');
        localStorage.removeItem('email');
        localStorage.removeItem('image');

        document.cookie = 'accessToken=expired; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        document.cookie = 'userId=expired; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        document.cookie = 'role=expired=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        router.push('/')
    }

    return (
        <div>
            <button aria-haspopup="true" onClick={handleClick}
                className='flex items-center justify-center w-8 h-8 text-white rounded-full bg-[#2e8cca]'>
                {username.trim().substring(0, 1).toUpperCase()}
            </button>
            <Menu id="simple-menu" anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}>
                <MenuItem onClick={() => {
                    router.push(`/${role}/profile`)
                    handleClose()
                }}>Profile</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
        </div>
    )
}